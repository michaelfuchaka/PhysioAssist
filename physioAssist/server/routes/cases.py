from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta
from services.ai_service import analyze_symptoms
from extensions import db
from models.case import Case
from models.draft import Draft

cases_bp = Blueprint('cases', __name__, url_prefix='/api/cases')

@cases_bp.route('/stats', methods=['GET'])
@jwt_required()
def stats():
    user_id = get_jwt_identity()

     # Total cases for this user
    total_cases = Case.query.filter_by(user_id=user_id).count()

     # Cases created this week (week starts Monday, UTC)
    now = datetime.utcnow()
    start_of_week =   datetime(now.year, now.month, now.day) - timedelta(days=now.weekday())
    cases_this_week = (
         Case.query
        .filter(Case.user_id == user_id, Case.created_at >= start_of_week)
        .count()
     )
    
    try:
        active_drafts = Draft.query.filter_by(user_id=user_id, status='active').count()
    except Exception:
        active_drafts = Draft.query.filter_by(user_id=user_id).count()

    return jsonify({
        "total_cases": total_cases,
        "cases_this_week": cases_this_week,
        "active_drafts": active_drafts
    }), 200

@cases_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze():
     """Analyze patient symptoms using AI"""
     user_id = get_jwt_identity()
     data = request.get_json()


    # Validate required fields
     pain_region = data.get('painRegion', '' ).strip()
     symptoms = data.get('symptoms', '').strip()
     duration = data.get('duration', '').strip()

     if not pain_region or not symptoms or duration:
         return jsonify({'error':'Pain region, symptoms, and duration are required'}), 400
     

    # Optional fields
     aggravating = data.get('aggravating', '').strip()
     additional = data.get('additional', '').strip()

     # Call AI service
     ai_result = analyze_symptoms({
          'pain_region': pain_region,
        'symptoms': symptoms,
        'duration': duration,
        'aggravating': aggravating,
        'additional': additional
     })
    
     if not ai_result['success']:
          return jsonify({'error': f'AI analysis failed: {ai_result["error"]}'}), 500
            
     ai_data = ai_result['data']       

      # Create new case
     try:
        new_case = Case(
            user_id=user_id,
            pain_region=pain_region,
            symptom_description=symptoms,
            duration=duration,
            aggravating_factors=aggravating if aggravating else None,
            additional_information=additional if additional else None,
            ai_conditions=ai_data['ai_conditions'],
            primary_condition=ai_data['primary_condition'],
            relevant_conditions=ai_data['relevant_conditions'],
            red_flags=ai_data['red_flags'],
            treatment_plan=ai_data['treatment_plan'],
            soap_note=ai_data['soap_note']
        )
        
        db.session.add(new_case)
        db.session.commit()
        
        return jsonify({
            'case_id': new_case.id,
            'message': 'Analysis complete',
            'analysis': {
                'ai_conditions': ai_data['ai_conditions'],
                'primary_condition': ai_data['primary_condition'],
                'relevant_conditions': ai_data['relevant_conditions'],
                'red_flags': ai_data['red_flags'],
                'treatment_plan': ai_data['treatment_plan'],
                'soap_note': ai_data['soap_note']
            }
        }), 201
    
     except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Database error: {str(e)}'}), 500