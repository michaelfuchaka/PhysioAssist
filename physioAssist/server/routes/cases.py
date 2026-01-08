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

     if not pain_region or not symptoms or not duration:
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

@cases_bp.route('/draft', methods=['POST'])
@jwt_required()
def save_draft():
    """Save incomplete form as draft"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    try:
       
        
        draft = Draft(
            user_id=user_id,
            pain_region=data.get('painRegion', '').strip() or None,
            symptom_description=data.get('symptoms', '').strip() or None,
            duration=data.get('duration', '').strip() or None,
            aggravating_factors=data.get('aggravating', '').strip() or None,
            additional_information=data.get('additional', '').strip() or None
        )
        
        db.session.add(draft)
        db.session.commit()
        
        return jsonify({
            'draft_id': draft.id,
            'message': 'Draft saved successfully'
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to save draft: {str(e)}'}), 500
    
@cases_bp.route('/drafts', methods=['GET'])
@jwt_required()
def get_drafts():
    """Get all drafts for current user"""
    user_id = get_jwt_identity()
    
    drafts = Draft.query.filter_by(user_id=user_id).order_by(Draft.saved_at.desc()).all()
    
    drafts_list = [
        {
            'id': draft.id,
            'pain_region': draft.pain_region,
            'symptom_description': draft.symptom_description,
            'saved_at': draft.saved_at.isoformat() if draft.saved_at else None
        }
        for draft in drafts
    ]
    
    return jsonify({'drafts': drafts_list}), 200    

@cases_bp.route('/draft/<int:draft_id>', methods=['GET'])
@jwt_required()
def get_draft(draft_id):
    """Get single draft by ID"""
    user_id = get_jwt_identity()
    
    draft = Draft.query.filter_by(id=draft_id, user_id=user_id).first()
    
    if not draft:
        return jsonify({'error': 'Draft not found'}), 404
    
    return jsonify({
        'id': draft.id,
        'painRegion': draft.pain_region or '',
        'symptoms': draft.symptom_description or '',
        'duration': draft.duration or '',
        'aggravating': draft.aggravating_factors or '',
        'additional': draft.additional_information or ''
    }), 200

@cases_bp.route('/draft/<int:draft_id>', methods=['DELETE'])
@jwt_required()
def delete_draft(draft_id):
    """Delete a draft"""
    user_id = get_jwt_identity()
    
    draft = Draft.query.filter_by(id=draft_id, user_id=user_id).first()
    
    if not draft:
        return jsonify({'error': 'Draft not found'}), 404
    
    try:
        db.session.delete(draft)
        db.session.commit()
        return jsonify({'message': 'Draft deleted successfully'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to delete draft: {str(e)}'}), 500
    
@cases_bp.route('/history', methods=['GET'])
@jwt_required()
def get_history():
    """Get all completed cases for history page"""
    user_id = get_jwt_identity()
    
    cases = Case.query.filter_by(user_id=user_id).order_by(Case.created_at.desc()).all()
    
    cases_list = [
        {
            'id': case.id,
            'pain_region': case.pain_region,
            'primary_condition': case.primary_condition,
            'created_at': case.created_at.isoformat() if case.created_at else None
        }
        for case in cases
    ]
    
    return jsonify({'cases': cases_list}), 200

@cases_bp.route('/<int:case_id>', methods=['GET'])
@jwt_required()
def get_case(case_id):
    """Get full case details for results page"""
    user_id = get_jwt_identity()
    
    case = Case.query.filter_by(id=case_id, user_id=user_id).first()
    
    if not case:
        return jsonify({'error': 'Case not found'}), 404
    
    return jsonify({
        'id': case.id,
        'pain_region': case.pain_region,
        'symptom_description': case.symptom_description,
        'duration': case.duration,
        'aggravating_factors': case.aggravating_factors,
        'additional_information': case.additional_information,
        'ai_conditions': case.ai_conditions,
        'primary_condition': case.primary_condition,
        'relevant_conditions': case.relevant_conditions,
        'red_flags': case.red_flags,
        'treatment_plan': case.treatment_plan,
        'soap_note': case.soap_note,
        'created_at': case.created_at.isoformat() if case.created_at else None
    }), 200    

@cases_bp.route('/<int:case_id>/conditions', methods=['PUT'])
@jwt_required()
def update_conditions(case_id):
    """Update selected conditions for a case"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    case = Case.query.filter_by(id=case_id, user_id=user_id).first()
    
    if not case:
        return jsonify({'error': 'Case not found'}), 404
    
    try:
        # Store selections in a new field or update existing
        case.selected_primary = data.get('primary')
        case.selected_relevant = data.get('relevant', [])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Conditions updated successfully',
            'primary': case.selected_primary,
            'relevant': case.selected_relevant
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update: {str(e)}'}), 500
