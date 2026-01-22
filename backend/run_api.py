"""
Script to run the FastAPI RAG Agent API server
"""
import uvicorn
import argparse
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def main():
    parser = argparse.ArgumentParser(description='Run the RAG Agent API server')
    parser.add_argument('--host', default='0.0.0.0', help='Host to bind to (default: 0.0.0.0)')
    parser.add_argument('--port', type=int, default=8000, help='Port to bind to (default: 8000)')
    parser.add_argument('--reload', action='store_true', help='Enable auto-reload for development')

    args = parser.parse_args()

    host = args.host
    port = args.port

    print(f"Starting RAG Agent API server on {host}:{port}")
    print("Press Ctrl+C to stop the server")

    uvicorn.run(
        "api:app",
        host=host,
        port=port,
        reload=args.reload,
        log_level="info"
    )

if __name__ == "__main__":
    main()
