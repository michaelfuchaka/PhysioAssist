from flask import Blueprint, request, jsonify,  make_response
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from datetime import timedelta
from extensions import db
from models.user import User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

# Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    fullname = data.get('fullname')
    email = data.get('email')
    gender = data.get('gender')
    password = data.get('password')

    if not fullname or not email or not password:
        return jsonify({'error':'All fields are required'}), 400
    

    # check if email exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify ({'error': 'Email already registered'}), 400
    
    if gender == 'male':
        avatar = '/avatars/male.png'
    elif gender == 'female':
        avatar = '/avatars/female.png'
    else:
        avatar = '/avatars/neutral.png'
    
     # create user
    user = User(fullname=fullname, email=email, gender=gender, avatar=avatar)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully',
        'user':{
            'id':user.id,
            'name':user.fullname,
            'email':user.email,
            'avatar': user.avatar
        }
    }), 201


# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    # validation
    if not email or not password:
        return jsonify({'error':'Email and password are required'}), 400
    
    
    user = User.query.filter_by(email=email).first()

    
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

     
    #  token lasts in 3 months
    access_token = create_access_token(
        identity=user.id,
        expires_delta=timedelta(days=90)
    )

    # Create response
    response = make_response(jsonify({
        'message': 'Login successful',
        'token': access_token,
        'user':{
            'id':user.id,
            'name':user.fullname,
            'email': user.email,
            'avatar': user.avatar,
            'language_preference': user.language_preference
        }
    })
     ,200  )  

     # Set token in httpOnly cookie not accessible via JS
    response.set_cookie(
        "access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite='Lax',
        max_age=7776000
)

    return response


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()  
def logout():
    response = make_response(jsonify({
        'message': 'Logout successful'
    }), 200)
    
    # Delete the cookie
    response.set_cookie(
        'access_token',
        value='',
        httponly=True,
        expires=0  
    )
    
    return response


@auth_bp.route('/me', methods=['GET'])
@jwt_required()  
def get_current_user():
    """Get currently logged-in user info"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'user': {
            'id': user.id,
            'name': user.fullname,
            'email': user.email,
            'avatar': user.avatar,
            'language_preference': user.language_preference
        }
    }), 200

