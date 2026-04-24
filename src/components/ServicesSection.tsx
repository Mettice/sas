import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Network, Brain, Database, Cpu, Eye, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   AI Infrastructure Services
───────────────────────────────────────────── */
const services = [
    {
        icon: Network,
        label: 'Multi-Model Orchestration',
        subtitle: 'Router · Fallbacks · Cost Caps',
        description:
            'One API that routes each request to Claude, GPT-5.2, Gemini 3, Llama 4 or Mistral based on intent, latency and budget. Bring your own keys or run on our managed GPU fleet.',
        accent: '#d8ff3d', // lime
        size: 'large',
    },
    {
        icon: Brain,
        label: 'Agentic Workflows',
        subtitle: 'Tools · Planners · Swarms',
        description:
            'Production-grade agents that reason, plan, call tools and recover from failure. We design the scaffolding, memory layer and human-in-the-loop hooks — not demos, systems.',
        accent: '#ffa14a', // amber
        size: 'normal',
    },
    {
        icon: Database,
        label: 'RAG & Knowledge Graphs',
        subtitle: 'Retrieval · Rerank · Citations',
        description:
            'Hybrid retrieval over your private corpus, graph-indexed for multi-hop reasoning. Cohere Rerank, Qdrant/pgvector, and evaluation loops that catch hallucinations before users do.',
        accent: '#8aa9ff', // steel blue
        size: 'normal',
    },
    {
        icon: Cpu,
        label: 'Inference Ops & GPU',
        subtitle: 'NVIDIA NIM · Triton · vLLM',
        description:
            'We deploy, auto-scale and monitor open-weight models on H200/B200 capacity. Sub-100ms median latency, cost-per-token dashboards, and hot-swap between on-prem and cloud GPUs.',
        accent: '#76B900', // nvidia
        size: 'normal',
    },
    {
        icon: Eye,
        label: 'Observability & Guardrails',
        subtitle: 'Traces · Evals · Policy',
        description:
            'Every call is traced. Every output is scored. We wire in PII redaction, prompt-injection defense, jailbreak detection and live evals so your AI stays shipped and safe.',
        accent: '#CC785C', // claude
        size: 'large',
    },
];

/* ─────────────────────────────────────────────
   Animated Card Component
───────────────────────────────────────────── */
interface CardProps {
    service: (typeof services)[0];
    index: number;
}

const ServiceCard: React.FC<CardProps> = ({ service, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const isWide = service.size === 'large';

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl overflow-hidden group border transition-all duration-500 ${hovered ? 'border-white/20' : 'border-white/5'
                } ${isWide ? 'lg:col-span-2' : 'col-span-1'}`}
            style={{ background: '#0a0a0a', minHeight: isWide ? 260 : 340 }}
        >
            {/* Background spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(500px circle at ${springX}px ${springY}px, ${service.accent}10 0%, transparent 65%)`,
                }}
            />

            <div className={`relative z-10 p-8 flex flex-col h-full ${isWide ? 'lg:flex-row lg:items-center lg:gap-12' : ''}`}>
                <div className={isWide ? 'flex-1 mb-6 lg:mb-0' : 'mb-8'}>
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500 mb-6"
                        style={{
                            background: hovered ? `${service.accent}15` : 'rgba(255,255,255,0.02)',
                            borderColor: hovered ? `${service.accent}30` : 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <service.icon size={24} style={{ color: hovered ? service.accent : '#9ca3af' }} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{service.label}</h3>
                    <p className="text-sm font-bold tracking-wider uppercase mb-1" style={{ color: `${service.accent}cc` }}>{service.subtitle}</p>
                </div>

                <div className={isWide ? 'flex-1' : ''}>
                    <p className="text-gray-400 leading-relaxed text-base font-medium">
                        {service.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-1 transition-transform cursor-pointer">
                        Explore practice <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
export const ServicesSection: React.FC = () => {
    return (
        <section id="solutions" className="relative py-32" style={{ background: '#020202' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-10 h-px bg-[#d8ff3d]" />
                        <span className="text-[11px] font-mono tracking-[0.3em] text-[#d8ff3d] uppercase">/ what we build</span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white leading-[0.95] tracking-tight"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', fontWeight: 500 }}
                        >
                            Five infrastructure pillars.<br />
                            <span
                                className="italic text-white/50"
                                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                            >
                                zero glue code for you.
                            </span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-white/55 font-light leading-relaxed max-w-lg mb-4"
                        >
                            We don't resell seats. We engineer, deploy and operate the full AI stack — from router to GPU to guardrails — on your cloud, our cloud, or a hybrid of both.
                        </motion.p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={service.label} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
