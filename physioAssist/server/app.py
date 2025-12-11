from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

app = Flask(__name__)


# Database configurationphysiAssist
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# Import models AFTER db exists (prevents circular import)
from models.user import User
from models.draft import Draft  
from models.case import Case


# Create database tables
with app.app_context():
    db.create_all()

# Run server
if __name__ ==  '__main__':
    app.run(debug=True)