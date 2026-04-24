# OpSyde — AI Infrastructure Agency (Landing Redesign)

## Original Problem Statement
> Analyse the App.tsx on this repository and work only on the Landing page and turn it in to a beautiful 3d Design or research a better AI Infrastructure Agency and then modify the landing pages or message to fit also add new Infrastructure platforms like Claude and others to make it look stunning, away from the current design.

User instruction: **"be creative"** — full creative freedom granted.

## Architecture
- React 19 + TypeScript (CRA) + Tailwind 3 + Framer Motion + **Three.js / @react-three/fiber v9 / @react-three/drei v10** (WebGL hero)
- Project lives in `/app` (not `/app/frontend`). Supervisor updated to `directory=/app`.
- Landing route: `/app/src/App.tsx` → `HomePage`.

## Core Positioning
- Repositioned from "AI consultancy" → **AI Infrastructure Agency**.
- Tagline: *"We architect the intelligence layer of modern enterprises."*
- Brand accent: **electric lime `#d8ff3d`** + amber `#ffa14a` over near-black.
- Typography: **Instrument Serif** (italic display) + **JetBrains Mono** (technical micro) + Inter (body) — deliberate move away from generic Space Grotesk / Inter-only.

## What's Been Implemented (Jan 2026)

### New components
- `src/components/hero/NeuralCore3D.tsx` — WebGL scene with emissive nucleus, wireframe icosahedron, 3 orbital rings, starfield particle backdrop
- `src/components/hero/NexusHero.tsx` — cinematic hero with 3D canvas + large italic typography + orbiting platform chips (Claude, OpenAI, Gemini, Llama, Mistral, NVIDIA, Perplexity, HuggingFace)
- `src/components/PlatformStack.tsx` — new **"Orchestration Stack"** section featuring 10 frontier AI platforms with brand logos + mock router API call

### Rewritten
- `src/components/ServicesSection.tsx` — 5 infrastructure pillars (Multi-Model Orchestration, Agentic Workflows, RAG & Knowledge Graphs, Inference Ops & GPU, Observability & Guardrails)
- `src/components/CapabilitiesSection.tsx` — Any-Model/Any-Cloud, Private Deployments, Sub-100ms Inference, Eval-Driven Rollouts
- `src/components/Navigation.tsx` — nav fully dark-mode, new "Stack" link, "AI Infrastructure" subtitle under brand, lime CTA "Book architect call"
- `src/components/HeroSection.tsx` — wraps `NexusHero` instead of old Opsyde/Myna hero
- `src/App.tsx` — inserts `<PlatformStack />` after hero, dark root container
- `src/index.css` — Instrument Serif + JetBrains Mono fonts, noise texture utility, spin-slow animation, lime selection accent
- `src/react-app-env.d.ts` — extends JSX namespaces for r3f intrinsics

### Packages added
- `three@^0.170`, `@react-three/fiber@^9`, `@react-three/drei@^10`
- `@types/three@0.158.3` (compatible with TS 4.9)

## AI Platforms Featured (Jan 2026 models)
| Platform | Models |
|---|---|
| Anthropic Claude | Sonnet 4.5 · Opus 4.5 |
| OpenAI | GPT-5.2 · o4 · GPT-Image-1 |
| Google Gemini | Gemini 3 Pro · Nano Banana |
| Meta Llama | Llama 4 · Llama 4 Scout |
| Mistral AI | Mistral Large 2 · Codestral |
| NVIDIA | H200 · B200 · DGX Cloud · NIM |
| Perplexity | Sonar Pro · Online RAG |
| xAI Grok | Grok 4 · Grok Vision |
| Hugging Face | Spaces · TGI · Inference |
| Cohere | Command R+ · Embed v4 |

## User Personas
- **VP Engineering / CTO** at B2B SaaS seeking multi-model orchestration without vendor lock-in
- **Head of AI / Platform Lead** at regulated enterprise (SOC 2 / HIPAA) needing private deployments
- **Growth agency / consultancy** (BCG, Andzen type) bringing AI to client engagements

## Prioritised Backlog
### P1
- Add real Stripe/Calendly integration for "Book architect call" CTA funnel tracking
- Case Studies: swap to use PlatformStack accent colours for visual consistency
- Add `/stack` anchor scroll bias so nav click deep-links cleanly

### P2
- Interactive 3D: make the neural core react to mouse with OrbitControls (disabled autoRotate) for more engagement
- Replace mock router JSON panel with a live latency demo calling real endpoints

### P3
- Dark/light theme toggle on hero: restore light-mode variant of NexusHero
- Mobile: optimise 3D canvas perf (dpr cap, suspend when offscreen)

## Known Notes
- Supabase env vars in `/app/.env` are **PLACEHOLDER** values to satisfy the Chatbot component import — not a real integration.
- Backend service is marked FATAL in supervisor; this redesign is **frontend-only** and does not require the backend.

## Next Tasks
- Validate e2e (nav links, CTAs, scroll behaviour) via testing subagent (scheduled next)
