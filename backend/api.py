"""
FastAPI server for RAG Agent integration
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging
import os
from dotenv import load_dotenv
from datetime import datetime

# Import the agent
from agent import BookContentAgent

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO"),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Pydantic models
class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = {}

class QueryResponse(BaseModel):
    response: str
    sources: List[str] = []
    session_id: Optional[str] = None
    timestamp: str
    status: str

class ErrorResponse(BaseModel):
    error: str
    status_code: int

# Create FastAPI app instance
app = FastAPI(
    title="RAG Agent API",
    description="API for interacting with the RAG agent that retrieves book content",
    version="1.0.0"
)

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Agent management
class AgentManager:
    def __init__(self):
        self.agents = {}

    def get_agent(self, session_id: str = None):
        if session_id is None:
            if 'default' not in self.agents:
                self.agents['default'] = BookContentAgent()
            return self.agents['default']

        if session_id not in self.agents:
            self.agents[session_id] = BookContentAgent()
            logger.info(f"Created new agent instance for session: {session_id}")

        return self.agents[session_id]

# Initialize the agent manager
try:
    agent_manager = AgentManager()
    logger.info("Agent Manager initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize Agent Manager: {e}")
    agent_manager = None

@app.get("/")
async def root():
    return {"message": "RAG Agent API is running"}

@app.get("/health")
async def health_check():
    status = "healthy" if agent_manager is not None else "degraded (agent not available)"
    return {"status": status, "timestamp": datetime.now().isoformat()}

@app.get("/test")
async def test_endpoint():
    return {
        "message": "API is working correctly",
        "timestamp": datetime.now().isoformat(),
        "endpoints": ["/", "/health", "/query", "/test"]
    }

@app.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    if agent_manager is None:
        logger.error("RAG Agent is not available")
        raise HTTPException(status_code=503, detail="RAG Agent is not available")

    if not request.query or not request.query.strip():
        logger.warning(f"Invalid query received: '{request.query}'")
        raise HTTPException(status_code=400, detail="Query parameter is required and cannot be empty")

    logger.info(f"Processing query: {request.query[:100]}...")

    try:
        agent = agent_manager.get_agent(request.session_id)
        response_text = agent.query(request.query)

        response = QueryResponse(
            response=response_text,
            sources=[],
            session_id=request.session_id,
            timestamp=datetime.now().isoformat(),
            status="success"
        )

        logger.info(f"Query processed successfully: {request.query[:50]}...")
        return response

    except Exception as e:
        logger.error(f"Error processing query: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

logger.info("FastAPI app initialized successfully")
