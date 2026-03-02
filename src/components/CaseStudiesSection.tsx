import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Production work data
───────────────────────────────────────────── */
const caseStudies = [
    {
        company: 'BCG (Boston Consulting Group)',
        type: 'Enterprise Transformation',
        title: 'Financial Document Analysis RAG System',
        description:
            'We built a production RAG system for strategy consultants to parse 100+ page financial reports. Implemented semantic retrieval with 95%+ accuracy and automated source citations to eliminate manual audit risk.',
        metrics: [
            { value: '60%', label: 'Extraction Speed' },
            { value: 'Zero', label: 'Hallucinations' },
            { value: '95%+', label: 'Audit Accuracy' },
        ],
        tech: ['Vector DB', 'Semantic Search', 'LLM RAG'],
        accent: '#10b981', // emerald
    },
    {
        company: 'Andzen (Growth Agency)',
        type: 'SMB Scalability',
        title: 'Automated Klaviyo Audit Platform',
        description:
            'Developed a full-stack audit platform that reduced manual audit time from 72 hours to 30 minutes. The system integrations enabled the agency to scale their audit capacity by 10× without increasing headcount.',
        metrics: [
            { value: '10×', label: 'Capacity Gain' },
            { value: '30m', label: 'Audit Speed' },
            { value: '100+', label: 'Monthly Audits' },
        ],
        tech: ['FastAPI', 'PostgreSQL', 'API Automation'],
        accent: '#6366f1', // indigo
    },
    {
        company: 'Holiday Pirates',
        type: 'AI-Driven Integration',
        title: 'Global Deal Discovery Engine',
        description:
            'Architected a deal discovery engine processing thousands of flight offers daily. Implemented a custom ranking algorithm (PirateScore™) that feeds a RAG pipeline to surface high-ROI deals in real-time.',
        metrics: [
            { value: '60%', label: 'Review Time Saved' },
            { value: '1,000s', label: 'Daily Processing' },
            { value: 'Realtime', label: 'Deal Alerts' },
        ],
        tech: ['Airtable Automation', 'Slack RAG', 'Custom ML'],
        accent: '#f59e0b', // amber
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

                    <div className="flex items-center gap-2 text-sm font-bold text-white cursor-pointer group-hover:translate-x-1 transition-transform">
                        Read Case Study <ArrowRight size={14} className="text-indigo-400" />
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
        <section id="case-studies" className="relative py-32" style={{ background: '#020202' }}>
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
                            <div className="w-10 h-1 bg-emerald-500 rounded-full" />
                            <span className="text-xs font-bold tracking-[0.2em] text-emerald-400 uppercase">
                                Impact & Results
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter"
                        >
                            Proven outcomes <br />
                            <span className="text-gray-500">at every business scale.</span>
                        </motion.h2>
                    </div>

                    <motion.a
                        href="https://github.com/Mettice"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors border-b border-white/10 pb-2 group"
                    >
                        Explore Repo <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
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
