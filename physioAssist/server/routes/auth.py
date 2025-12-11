from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='api/auth')

auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error':'All fields are required'}), 400
    

    # check if email exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify ({'error': 'Email already registered'}), 400
    
     # create user
    user = User(name=name, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully',
        'user':{
            'id':user.id,
            'name':user.name,
            'email':user.email
        }
    }), 201