from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from extensions import db, bcrypt

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    fullname = Column(String(255), nullable=False)
    gender = Column(String(20), nullable=False)
    avatar = Column(String(255), nullable=False)
    language_preference = Column(String(2), default='EN')
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    drafts = relationship("Draft", back_populates="user", cascade="all, delete")
    cases = relationship("Case", back_populates="user", cascade="all, delete")

      # ---- password helper ----
    def set_password(self, password):
        """Hash and store password."""
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        """Verify password."""
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User {self.email}>"   
    