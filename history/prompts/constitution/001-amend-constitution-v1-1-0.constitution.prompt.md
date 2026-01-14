---
id: 1
title: Amend constitution to v1.1.0 (principle additions + governance update)
stage: constitution
date: 2026-01-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: test
command: sp.constitution
labels: ["constitution", "principles", "standards"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

Project

AI-Spec Driven Book with Embedded RAG Chatbot

Objective

Create a technical book using Spec-Kit Plus and Claude Code, publish it with Docusaurus to GitHub Pages, and embed a RAG chatbot grounded strictly in the book’s content.

Core Principles

Spec-driven development

No hallucinations; content-only grounding

Clear, technical writing

Reproducible and documented setup

Standards

Book

Written with Claude Code

Structured via Spec-Kit Plus

Built using Docusaurus

Deployed to GitHub Pages

Chatbot

Embedded in the book UI

Uses OpenAI Agents/ChatKit, FastAPI

Neon Serverless Postgres + Qdrant Cloud (Free Tier)

Answers:

From full book content

From user-selected text only when specified

Refuses unsupported queries

Constraints

Free-tier infrastructure only

No external or unstated data sources

Deterministic, context-bounded responses

Success Criteria

Book publicly accessible on GitHub Pages

Specs fully validated

Chatbot answers accurately and safely

Project reproducible end-to-end

## Response snapshot

The project constitution at `.specify/memory/constitution.md` has been updated to version 1.1.0. This update incorporates the core principles, standards for the book and chatbot, and specific constraints defined for the "AI-Spec Driven Book with Embedded RAG Chatbot" project. Dependent templates (spec, plan, tasks) were reviewed for alignment.

## Outcome

- ✅ Impact: Established project principles and standards for spec-driven development and RAG architecture.
- 🧪 Tests: n/a
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: /sp.specify for initial feature.
- 🧠 Reflection: The user provided a clear project definition which was mapped to the constitution structure.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
