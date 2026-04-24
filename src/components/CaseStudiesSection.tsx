import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Production work data
───────────────────────────────────────────── */
const caseStudies = [
    {
        company: 'BCG (Boston Consulting Group)',
        type: 'Multi-Model RAG',
        title: 'Financial Document Analysis System',
        description:
            'We architected a Claude + GPT-5.2 hybrid RAG router for strategy consultants parsing 100+ page financial reports. Semantic retrieval at 95%+ accuracy, automated citation graphs, and a fallback to Llama 4 when token budgets exceed threshold.',
        metrics: [
            { value: '60%', label: 'Faster Extraction' },
            { value: '0', label: 'Hallucinations' },
            { value: '95%', label: 'Audit Accuracy' },
        ],
        tech: ['Claude Sonnet 4.5', 'Qdrant', 'Router Fallback'],
        accent: '#d8ff3d',
    },
    {
        company: 'Andzen (Growth Agency)',
        type: 'Agent Orchestration',
        title: 'Automated Klaviyo Audit Platform',
        description:
            'A multi-agent swarm that pulls Klaviyo data, runs eval loops across three LLMs, and ships a branded audit PDF in 30 minutes instead of 72 hours. Agency capacity scaled 10× with zero additional headcount.',
        metrics: [
            { value: '10×', label: 'Capacity Gain' },
            { value: '30m', label: 'Audit Speed' },
            { value: '100+', label: 'Monthly Audits' },
        ],
        tech: ['Agent Swarm', 'GPT-5.2 + Gemini', 'Eval Loops'],
        accent: '#ffa14a',
    },
    {
        company: 'Holiday Pirates',
        type: 'Real-time Inference',
        title: 'Global Deal Discovery Engine',
        description:
            'Thousands of flight offers processed every minute through a custom ranking model on NVIDIA H200s, feeding a grounded-search RAG pipeline powered by Perplexity Sonar. Sub-100ms decision latency, zero downtime.',
        metrics: [
            { value: '99ms', label: 'p95 Latency' },
            { value: '10k/m', label: 'Offers Scored' },
            { value: 'Realtime', label: 'Deal Alerts' },
        ],
        tech: ['NVIDIA H200', 'Perplexity Sonar', 'Custom Rerank'],
        accent: '#8aa9ff',
    },
];

/* ─────────────────────────────────────────────
   Study Card
───────────────────────────────────────────── */
const CaseStudyCard: React.FC<{ study: typeof caseStudies[0]; index: number }> = ({ study, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    const yOffset = useTransform(scrollYProgress, [0, 1], [40, -40]);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative w-full rounded-3xl border border-white/5 overflow-hidden mb-12 bg-[#0a0a0a] group"
        >
            <div className="relative z-10 p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Text Area */}
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span
                            className="text-xs font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full border"
                            style={{
                                borderColor: `${study.accent}30`,
                                color: study.accent,
                                background: `${study.accent}10`,
                            }}
                        >
                            {study.type}
                        </span>
                        <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">{study.company}</span>
                    </div>

                    <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
                        {study.title}
                    </h3>

                    <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
                        {study.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-12">
                        {study.tech.map((t, i) => (
                            <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                                {t}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-[12px] font-mono tracking-wide text-white group-hover:translate-x-1 transition-transform cursor-pointer hover:text-[#d8ff3d]" style={{ color: study.accent }}>
                        Read case study <ArrowRight size={14} />
                    </div>
                </div>

                {/* Metrics Grid */}
                <motion.div
                    style={{ y: yOffset }}
                    className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6"
                >
                    {study.metrics.map((m, i) => (
                        <div
                            key={i}
                            className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden group/metric"
                        >
                            <div
                                className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover/metric:opacity-10 transition-opacity"
                                style={{ background: `radial-gradient(circle at bottom left, ${study.accent}, transparent 70%)` }}
                            />
                            <div
                                className="text-4xl lg:text-5xl font-black tracking-tighter mb-2"
                                style={{
                                    background: `linear-gradient(180deg, #fff, ${study.accent}88)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {m.value}
                            </div>
                            <div className="text-xs text-gray-400 font-black tracking-[0.2em] uppercase">
                                {m.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Section Component
───────────────────────────────────────────── */
export const CaseStudiesSection: React.FC = () => {
    return (
        <section id="case-studies" className="relative py-32" style={{ background: '#030405' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="w-10 h-px bg-[#d8ff3d]" />
                            <span className="text-[11px] font-mono tracking-[0.3em] text-[#d8ff3d] uppercase">
                                /impact in production
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-white leading-[0.95] tracking-tight"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', fontWeight: 500 }}
                        >
                            Systems running <br />
                            <span
                                className="italic text-white/55"
                                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                            >
                                at every scale.
                            </span>
                        </motion.h2>
                    </div>

                    <motion.a
                        href="https://github.com/Mettice"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-[12px] font-mono tracking-wide text-white/50 hover:text-[#d8ff3d] transition-colors border-b border-white/10 hover:border-[#d8ff3d]/50 pb-2 group"
                    >
                        Explore repo <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                {/* List of studies */}
                <div className="space-y-4">
                    {caseStudies.map((study, index) => (
                        <CaseStudyCard key={index} study={study} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
