from app import create_app
from extensions import db, bcrypt
from models.user import User
from models.case import Case
from models.draft import Draft
from datetime import datetime

def seed_data():
    app = create_app()
    
    with app.app_context():
        # Clear existing data 
        print("Clearing existing data...")
        Draft.query.delete()
        Case.query.delete()
        User.query.delete()
        db.session.commit()
        
        # Create test users with gender-based avatars
        print("Creating users...")
        user1 = User(
            fullname="Michael Fuchaka",
            email="michael@physioassist.com",
            gender="male",
            avatar="/assets/avatars/male.png",  
            language_preference="EN"
        )
        user1.set_password("password123")
        
        user2 = User(
            fullname="Jane Smith",
            email="jane@physioassist.com",
            gender="female",
            avatar="/assets/avatars/female.png",  
            language_preference="EN"
        )
        user2.set_password("password123")
        
        user3 = User(
            fullname="Alex Johnson",
            email="alex@physioassist.com",
            gender="neutral",
            avatar="/assets/avatars/neutral.png",  
            language_preference="DE"
        )
        user3.set_password("password123")
        
        db.session.add_all([user1, user2, user3])
        db.session.commit()
        
        # Create test cases for user1
        print("Creating cases...")
        case1 = Case(
            user_id=user1.id,
            pain_region="Shoulder",
            symptom_description="Sharp pain in right shoulder with limited range of motion, especially during overhead activities",
            duration="2 weeks",
            aggravating_factors="Lifting objects overhead, reaching behind back",
            primary_condition="Rotator Cuff Injury",
           ai_conditions=[
            {"condition": "Rotator Cuff Tear", "probability": "high", "reasoning": "Classic presentation"},
            {"condition": "Subacromial Impingement", "probability": "medium", "reasoning": "Pain with overhead activities"}
        ],
            treatment_plan="Physical therapy focusing on rotator cuff strengthening, pain management with NSAIDs",
            soap_note={
                "subjective": "Patient reports sharp shoulder pain for 2 weeks",
                "objective": "Limited ROM, positive Neer's test",
                "assessment": "Rotator Cuff Injury",
                "plan": "PT 3x/week, ice therapy, NSAIDs"
            },
            red_flags=[],
            created_at=datetime(2024, 11, 20)
        )
        
        case2 = Case(
            user_id=user1.id,
            pain_region="Knee",
            symptom_description="Anterior knee pain, worse with climbing stairs and prolonged sitting",
            duration="1 month",
            aggravating_factors="Stair climbing, squatting, prolonged sitting",
            primary_condition="Patellofemoral Pain",
             ai_conditions=[
            {"condition": "Patellofemoral Pain Syndrome", "probability": "high", "reasoning": "Anterior knee pain pattern"},
            {"condition": "Patellar Tendinopathy", "probability": "medium", "reasoning": "Activity-related pain"}
                 ],
            treatment_plan="Quadriceps strengthening, patellar taping, activity modification",
            soap_note={
                "subjective": "Anterior knee pain for 1 month",
                "objective": "Positive patellar grind test",
                "assessment": "Patellofemoral Pain Syndrome",
                "plan": "Strengthening exercises, taping"
            },
                red_flags=[
        "Night pain",
        "Unexplained swelling"
    ],
            created_at=datetime(2024, 11, 15)
        )
        
        case3 = Case(
            user_id=user1.id,
            pain_region="Low Back",
            symptom_description="Lower back pain with stiffness, worse in the morning",
            duration="3 days",
            aggravating_factors="Bending forward, prolonged sitting",
            primary_condition="Lumbar Strain",
           ai_conditions=[
            {"condition": "Lumbar Muscle Strain", "probability": "high", "reasoning": "Acute onset, mechanical pattern"},
            {"condition": "Facet Joint Dysfunction", "probability": "medium", "reasoning": "Morning stiffness"}
        ],
            treatment_plan="Core strengthening, heat therapy, gradual return to activity",
            soap_note={
                "subjective": "Lower back pain for 3 days",
                "objective": "Reduced lumbar flexion",
                "assessment": "Lumbar Strain",
                "plan": "Core exercises, heat therapy"
            },
             red_flags=[
        "Severe morning stiffness",
        "Pain not relieved by rest",
        "Recent unexplained weight loss"
    ],
            created_at=datetime(2024, 11, 15)
        )
        
        case4 = Case(
            user_id=user1.id,
            pain_region="Ankle",
            symptom_description="Lateral ankle pain and swelling after inversion injury",
            duration="1 week",
            aggravating_factors="Weight bearing, walking on uneven surfaces",
            primary_condition="Ankle Sprain",
            ai_conditions=[
            {"condition": "Lateral Ankle Sprain Grade II", "probability": "high", "reasoning": "Inversion injury mechanism"},
            {"condition": "ATFL Tear", "probability": "medium", "reasoning": "Positive anterior drawer"}
        ],
            treatment_plan="RICE protocol, ankle strengthening, proprioception training",
            soap_note={
                "subjective": "Ankle sprain 1 week ago",
                "objective": "Swelling, positive anterior drawer test",
                "assessment": "Lateral Ankle Sprain",
                "plan": "RICE, strengthening exercises"
            },
             red_flags=[
        "Inability to bear weight"
    ],
            created_at=datetime(2024, 11, 12)
        )
        
        case5 = Case(
            user_id=user1.id,
            pain_region="Hip",
            symptom_description="Lateral hip pain, worse when lying on affected side",
            duration="2 weeks",
            aggravating_factors="Lying on side, prolonged standing",
            primary_condition="Hip Bursitis",
           ai_conditions=[
            {"condition": "Trochanteric Bursitis", "probability": "high", "reasoning": "Lateral hip pain, tender point"},
            {"condition": "Gluteal Tendinopathy", "probability": "medium", "reasoning": "Activity-related pattern"}
        ],
            treatment_plan="Activity modification, hip strengthening, anti-inflammatory medication",
            soap_note={
                "subjective": "Lateral hip pain for 2 weeks",
                "objective": "Tender over greater trochanter",
                "assessment": "Trochanteric Bursitis",
                "plan": "Activity modification, strengthening"
            },
             red_flags=[
        "Night pain",
        "Pain at rest"
    ],
            created_at=datetime(2024, 11, 10)
        )
        
        db.session.add_all([case1, case2, case3, case4, case5])
        db.session.commit()
        
        # Create drafts for user1
        print("Creating drafts...")
        draft1 = Draft(
            user_id=user1.id,
            pain_region="Shoulder",
            symptom_description="Pain in shoulder when lifting",
            duration="3 days",
            aggravating_factors="Overhead movements",
            saved_at=datetime(2024, 11, 22)

        )
        
        draft2 = Draft(
            user_id=user1.id,
            pain_region="Knee",
            symptom_description="Swelling and pain in knee after running",
            duration="1 week",
            saved_at=datetime(2024, 11, 20)
        )
        
        db.session.add_all([draft1, draft2])
        db.session.commit()
        
        print("✅ Seed data created successfully!")
        print(f"Created {User.query.count()} users")
        print(f"Created {Case.query.count()} cases")
        print(f"Created {Draft.query.count()} drafts")
        print("\nTest credentials:")
        print("Male User - Email: michael@physioassist.com | Password: password123")
        print("Female User - Email: jane@physioassist.com | Password: password123")
        print("Neutral User - Email: alex@physioassist.com | Password: password123")
       
if __name__ == "__main__":
    seed_data()