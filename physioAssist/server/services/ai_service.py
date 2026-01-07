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