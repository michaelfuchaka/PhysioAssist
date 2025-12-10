from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)


# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:physiAssist%402026.@localhost:5432/physioassist_db'
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