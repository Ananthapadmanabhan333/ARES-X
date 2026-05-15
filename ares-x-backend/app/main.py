from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.v1.api import api_router
from app.db.session import engine, Base
import app.models.domain # Ensure models are registered

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables
    print("[*] Initializing Database...")
    try:
        Base.metadata.create_all(bind=engine)
        print("[+] Database Initialized.")
    except Exception as e:
        print(f"[!] Database initialization failed: {e}")
    yield
    # Shutdown: Clean up if needed
    print("[*] Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="ARES X: Autonomous Retrieval & Evidence Surveillance for Extended Digital Forensics",
    version="1.0.0",
    lifespan=lifespan
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.ALLOWED_HOSTS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "online",
        "system": "ARES X",
        "version": "1.0.0",
        "intelligence_mesh": "active"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
