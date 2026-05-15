from typing import TypedDict, List, Annotated, Sequence
import operator
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    case_context: dict
    evidence_findings: List[dict]
    current_agent: str

def evidence_agent(state: AgentState):
    """Parses raw evidence and extracts technical artifacts."""
    # Logic for Evidence Agent
    return {"messages": [HumanMessage(content="[EvidenceAgent] Technical artifacts extracted.")], "current_agent": "metadata"}

def metadata_agent(state: AgentState):
    """Analyzes file metadata and chronology."""
    # Logic for Metadata Agent
    return {"messages": [HumanMessage(content="[MetadataAgent] Metadata timeline reconstructed.")], "current_agent": "deepfake"}

def deepfake_agent(state: AgentState):
    """Detects media tampering and synthetic anomalies."""
    # Logic for Deepfake Agent
    return {"messages": [HumanMessage(content="[DeepfakeAgent] Media integrity analysis complete.")], "current_agent": "orchestrator"}

def orchestrator_agent(state: AgentState):
    """Synthesizes all findings into a forensic hypothesis."""
    # Logic for Orchestrator
    return {"messages": [HumanMessage(content="[Orchestrator] Final forensic reasoning complete.")], "current_agent": "end"}

# Build Graph
workflow = StateGraph(AgentState)

workflow.add_node("evidence", evidence_agent)
workflow.add_node("metadata", metadata_agent)
workflow.add_node("deepfake", deepfake_agent)
workflow.add_node("orchestrator", orchestrator_agent)

workflow.set_entry_point("evidence")

workflow.add_edge("evidence", "metadata")
workflow.add_edge("metadata", "deepfake")
workflow.add_edge("deepfake", "orchestrator")
workflow.add_edge("orchestrator", END)

forensic_graph = workflow.compile()
