<!--
  Sync Impact Report
  Version change: 1.0.0 → 1.1.0
  List of modified principles:
    - II. No Hallucinations - Content-Only Grounding → II. No Hallucinations - Content-Only Grounding (Refined wording)
    - V. Free-Tier Infrastructure Only → V. Free-Tier Infrastructure Only (Explicitly mentions Neon/Qdrant)
    - VI. Deterministic Context-Bounded Responses → VI. Deterministic Context-Bounded Responses (Strict refusal)
  Added sections:
    - Book Standards
    - Chatbot Standards
  Removed sections:
    - None
  Templates requiring updates:
    - specs/[feature]/plan.md (✅ updated)
    - specs/[feature]/spec.md (✅ updated)
    - specs/[feature]/tasks.md (✅ updated)
  Follow-up TODOs:
    - Initial ratification date set to 2026-01-10.
-->
# AI-Spec Driven Book with Embedded RAG Chatbot Constitution

## Core Principles

### I. Spec-Driven Development
All development must follow Spec-Kit Plus methodology. Features and components must be fully specified before implementation. Specifications must include clear acceptance criteria, constraints, and success metrics.

### II. No Hallucinations - Content-Only Grounding
The RAG chatbot must answer questions strictly from the book's content. No external data sources or hallucinations are permitted. When user-selected text is specified, answers must be limited to that context only.

### III. Clear Technical Writing
All book content must be written in clear, concise technical language. Code examples must be accurate and tested. Technical concepts must be explained with appropriate depth for the target audience.

### IV. Reproducible and Documented Setup
The entire project must be reproducible from scratch using the provided documentation. All setup steps, dependencies, and configuration must be clearly documented and tested.

### V. Free-Tier Infrastructure Only
All infrastructure components (Neon Serverless Postgres, Qdrant Cloud, etc.) must use free-tier offerings only. No paid services or components that exceed free-tier limits may be used.

### VI. Deterministic Context-Bounded Responses
Chatbot responses must be deterministic and strictly bounded by the provided context. The system must refuse to answer queries that fall outside the supported scope or require external knowledge.

## Book Standards

The technical book must be:
- Written using Claude Code
- Structured via Spec-Kit Plus methodology
- Built using Docusaurus framework
- Deployed to GitHub Pages for public accessibility

## Chatbot Standards

The embedded RAG chatbot must:
- Be integrated into the book's user interface
- Use OpenAI Agents/ChatKit for natural language processing
- Utilize FastAPI for backend services
- Store vector embeddings in Neon Serverless Postgres with Qdrant Cloud (Free Tier)
- Provide answers from full book content by default
- Support user-selected text context when explicitly specified
- Implement proper query refusal for unsupported questions

## Constraints

- No external or unstated data sources may be used
- All responses must be traceable to specific book content
- Infrastructure must remain within free-tier limits
- Project must be fully reproducible end-to-end

## Governance

This constitution supersedes all other project practices and guidelines. All contributions must comply with these principles. Amendments require:
- Documentation of changes and rationale
- Approval through established review process
- Migration plan for existing components if needed

**Version**: 1.1.0 | **Ratified**: 2026-01-10 | **Last Amended**: 2026-01-10
