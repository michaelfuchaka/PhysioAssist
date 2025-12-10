from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app import db


class Draft(db.Model):
    __tablename__ = 'drafts'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    pain_region = Column(String(100), nullable=True)
    symptom_description = Column(Text, nullable=True)
    duration = Column(String(100), nullable=True)
    aggravating_factors = Column(Text, nullable=True)
    additional_information = Column(Text, nullable=True)

    saved_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship back to user
    user = relationship("User", back_populates="drafts")

    def __repr__(self):
        return f"<Draft {self.id}>"
