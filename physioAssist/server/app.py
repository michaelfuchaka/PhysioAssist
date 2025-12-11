from flask import Flask
from flask_jwt_extended import JWTManager  
from dotenv import load_dotenv
import os

from extensions import db, bcrypt   

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    # JWT Configuration ✅ ADD THESE LINES
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_TOKEN_LOCATION'] = ['cookies'] 
    app.config['JWT_COOKIE_CSRF_PROTECT'] = False   #eneble CSRF protection in production
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  


    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt = JWTManager(app) 

      # register routes
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp)


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
