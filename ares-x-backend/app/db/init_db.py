from app.db.session import engine, Base
from app.models.domain import Case, Evidence, ChainOfCustody, AuditLog

def init_db():
    print("[*] Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    print("[+] Database tables created successfully.")

if __name__ == "__main__":
    init_db()
