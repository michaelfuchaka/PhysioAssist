from flask import Flask
from dotenv import load_dotenv
import os

from extensions import db, bcrypt   # ← import here (no circular import)

load_dotenv()

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)

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
