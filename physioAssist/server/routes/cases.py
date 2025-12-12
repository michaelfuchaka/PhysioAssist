from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime, timedelta

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