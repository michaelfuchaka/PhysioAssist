import os
import json
from openai import OpenAI

def get_openai_client():
    """Initialize and return OpenAI client"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
         raise ValueError("OPENAI_API_KEY not found in environment variables")
    return OpenAI(api_key=api_key)

def build_prompt(pain_region, symptoms, duration, aggravating, additional):
     """Build the prompt for OpenAI API"""
     prompt = f"""You are an expert physiotherapist assistant. Analyze the following patient presentation and provide a structured assessment.

PATIENT INFORMATION:
- Pain Region: {pain_region}
- Symptoms: {symptoms}
- Duration: {duration}
- Aggravating Factors: {aggravating or 'Not specified'}
- Additional Information: {additional or 'None'}

Provide your analysis in the following JSON format:
{{
  "differential_diagnosis": [
    {{"condition": "condition name", "probability": "high/medium/low", "reasoning": "brief explanation"}}
  ],
  "primary_condition": "most likely condition name",
  "red_flags": ["red flag 1", "red flag 2"],
  "treatment_plan": {{
    "exercises": ["exercise 1", "exercise 2"],
    "manual_therapy": ["technique 1"],
    "activity_modification": ["modification 1"],
    "expected_recovery": "timeframe"
  }},
  "soap_note": {{
    "subjective": "patient's reported symptoms and history",
    "objective": "observable findings and clinical observations",
    "assessment": "clinical reasoning and diagnosis",
    "plan": "treatment plan and next steps"
  }}
}}

Important: Respond ONLY with valid JSON, no additional text."""

     return prompt

def call_openai(prompt):
    """Call OpenAI API and return response"""
    try:
        client = get_openai_client()

        response = client.chat.completions.create(
             model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are an expert physiotherapist assistant. Respond only with valid JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.5
        )
        
        return response.choices[0].message.content
    
    except Exception as e:
        raise Exception(f"OpenAI API call failed: {str(e)}")


def parse_response(response_text):
    """Parse OpenAI response and map to database fields"""
    try:
        data = json.loads(response_text)
        
        # Extract top 3-5 conditions for relevant_conditions
        differential = data.get('differential_diagnosis', [])
        relevant_conditions = [
            {"condition": item["condition"], "probability": item["probability"]}
            for item in differential[:5]
        ]
        
        # Convert treatment_plan object to text for database
        treatment_plan_obj = data.get('treatment_plan', {})
        treatment_plan_text = f"""
EXERCISES:
{chr(10).join(f"- {ex}" for ex in treatment_plan_obj.get('exercises', []))}

MANUAL THERAPY:
{chr(10).join(f"- {mt}" for mt in treatment_plan_obj.get('manual_therapy', []))}

ACTIVITY MODIFICATION:
{chr(10).join(f"- {am}" for am in treatment_plan_obj.get('activity_modification', []))}

EXPECTED RECOVERY: {treatment_plan_obj.get('expected_recovery', 'Not specified')}
        """.strip()
        
        return {
            "ai_conditions": differential,
            "primary_condition": data.get('primary_condition', ''),
            "relevant_conditions": relevant_conditions,
            "red_flags": data.get('red_flags', []),
            "treatment_plan": treatment_plan_text,
            "soap_note": data.get('soap_note', {})
        }
    
    except json.JSONDecodeError as e:
        raise Exception(f"Failed to parse AI response: {str(e)}")


def analyze_symptoms(patient_data):
    """
    Main function to analyze patient symptoms
    
    Args:
        patient_data (dict): {
            "pain_region": str,
            "symptoms": str,
            "duration": str,
            "aggravating": str (optional),
            "additional": str (optional)
        }
    
    Returns:
        dict: Parsed AI analysis ready for database
    """
    try:
        # Step 1: Build prompt
        prompt = build_prompt(
            pain_region=patient_data.get('pain_region'),
            symptoms=patient_data.get('symptoms'),
            duration=patient_data.get('duration'),
            aggravating=patient_data.get('aggravating', ''),
            additional=patient_data.get('additional', '')
        )
        
        # Step 2: Call OpenAI
        response = call_openai(prompt)
        
        # Step 3: Parse response
        parsed = parse_response(response)
        
        return {
            "success": True,
            "data": parsed
        }
    
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

