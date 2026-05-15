from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.agents.orchestrator import forensic_graph
from app.schemas.domain import AnalysisResult
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/analyze/{evidence_id}", response_model=AnalysisResult)
async def run_ai_analysis(evidence_id: str, db: Session = Depends(get_db)):
    # Trigger the LangGraph orchestration
    initial_state = {
        "messages": [HumanMessage(content=f"Analyze evidence ID: {evidence_id}")],
        "case_context": {"evidence_id": evidence_id},
        "evidence_findings": [],
        "current_agent": "evidence"
    }
    
    try:
        # Run graph (mocking async execution for the demo)
        result = forensic_graph.invoke(initial_state)
        
        return {
            "evidence_id": evidence_id,
            "status": "ANALYSIS_COMPLETE",
            "agent_history": [m.content for m in result["messages"]],
            "final_hypothesis": "The evidence suggests synthetic manipulation at the macro-block level."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis Mesh failed: {str(e)}")

@router.get("/graph/{case_id}")
async def get_relationship_graph(case_id: str, db: Session = Depends(get_db)):
    # Mock graph data for the frontend
    return {
        "nodes": [
            {"id": "case", "label": f"CASE {case_id}", "type": "case"},
            {"id": "actor", "label": "UNC2544", "type": "actor"},
            {"id": "evidence", "label": "EVID_001", "type": "evidence"},
        ],
        "edges": [
            {"source": "case", "target": "actor", "label": "attributed_to"},
            {"source": "case", "target": "evidence", "label": "contains"},
        ]
    }
