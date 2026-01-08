from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from extensions  import db


class Case(db.Model):
    __tablename__ = 'cases'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)

    pain_region = Column(String(100), nullable=False)
    symptom_description = Column(Text, nullable=False)
    duration = Column(String(100), nullable=True)
    aggravating_factors = Column(Text, nullable=True)
    additional_information = Column(Text, nullable=True)

    ai_conditions = Column(JSON, nullable=False)             
    primary_condition = Column(String(255), nullable=True)   
    relevant_conditions = Column(JSON, nullable=True)         
    red_flags = Column(JSON, nullable=True)                   

    treatment_plan = Column(Text, nullable=False)             
    soap_note = Column(JSON, nullable=False)                 

    language = Column(String(2), default='EN')

    selected_primary = db.Column(db.String(255), nullable=True)
    selected_relevant = db.Column(JSONB, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationship back to user
    user = relationship("User", back_populates="cases")

    def __repr__(self):
        return f"<Case {self.id}>"
