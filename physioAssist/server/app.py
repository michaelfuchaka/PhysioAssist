from flask import Flask
from flask_jwt_extended import JWTManager  
from dotenv import load_dotenv
import os
from flask_cors import CORS

from extensions import db, bcrypt   

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    CORS(app, 
     origins=['http://localhost:3000'],
     supports_credentials=True,
     allow_headers=['Content-Type', 'Authorization'],
     expose_headers=['Set-Cookie'])

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    # JWT Configuration 
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies'] 
    app.config["JWT_ACCESS_COOKIE_NAME"] = "access_token" 
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False   #eneble CSRF protection in production
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  

    app.config['JWT_COOKIE_SECURE'] = False
    app.config['JWT_COOKIE_SAMESITE'] = 'Lax'
    app.config['JWT_COOKIE_HTTPONLY'] = True


    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app) 

      # register routes
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    
    # register case routes
    from routes.cases import cases_bp
    app.register_blueprint(cases_bp)
    



    # Register models
    with app.app_context():
        from models.user import User
        from models.draft import Draft
        from models.case import Case
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
