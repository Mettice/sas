import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Lock, Zap, GitBranch, Globe, Shield } from 'lucide-react';

/* ─────────────────────────────────────────────
   Infrastructure Capabilities
───────────────────────────────────────────── */
const pillars = [
    {
        icon: Cloud,
        title: 'Any-Model, Any-Cloud',
        description:
            "We run on AWS, GCP, Azure, Lambda Labs or bare-metal — and route between Claude, GPT-5.2, Gemini 3, Llama 4, Mistral and open-weight models per request. No vendor lock-in by design.",
        accent: '#d8ff3d',
    },
    {
        icon: Lock,
        title: 'Private Deployments',
        description:
            'VPC-only inference, BYO-key, zero-retention contracts and on-prem GPU options for regulated data. SOC 2, HIPAA and GDPR-aligned architectures from day one.',
        accent: '#ffa14a',
    },
    {
        icon: Zap,
        title: 'Sub-100ms Inference',
        description:
            'Optimised vLLM/TensorRT-LLM builds, KV-cache sharing, speculative decoding and smart batching. Dashboards that show p50/p95/p99 latency per model, per tenant, live.',
        accent: '#76B900',
    },
    {
        icon: GitBranch,
        title: 'Eval-Driven Rollouts',
        description:
            'Every prompt, model and tool is versioned, scored and shadow-tested. We ship behind feature flags with auto-rollback if quality, cost or latency regress.',
        accent: '#8aa9ff',
    },
];

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
export const CapabilitiesSection: React.FC = () => {
    return (
        <section id="capabilities" className="relative py-32" style={{ background: '#020202' }}>
            {/* Separation line */}
            <div className="absolute top-0 inset-x-0 h-px bg-white/5" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-10 h-px bg-[#d8ff3d]" />
                        <span className="text-[11px] font-mono tracking-[0.3em] text-[#d8ff3d] uppercase">
                            /operational capabilities
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white leading-[0.95] max-w-4xl tracking-tight"
                        style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', fontWeight: 500 }}
                    >
                        Built to run <br />
                        <span
                            className="italic text-white/50"
                            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                        >
                            in production, forever.
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-xl text-white/55 max-w-2xl font-light leading-relaxed"
                    >
                        We don&apos;t just deliver a prototype. We make sure your AI infrastructure is compliant, observable and operable the day after launch &mdash; and every day after.
                    </motion.p>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="relative group rounded-3xl p-10 border border-white/5 transition-all duration-500 hover:border-white/10"
                            style={{ background: '#0a0a0a' }}
                        >
                            {/* Subtle spotlight factor */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                style={{
                                    background: `radial-gradient(circle at top right, ${pillar.accent}, transparent 65%)`,
                                }}
                            />

                            <div className="relative z-10">
                                <div
                                    className="w-16 h-16 border rounded-2xl flex items-center justify-center mb-8 transition-all duration-500"
                                    style={{
                                        background: `rgba(255,255,255,0.02)`,
                                        borderColor: 'rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <pillar.icon size={28} style={{ color: pillar.accent }} />
                                </div>

                                <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Callout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Globe size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Global Delivery Network</h4>
                            <p className="text-gray-500 text-sm font-medium">Remote-first execution with partners across Europe, US, and Australia.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Shield size={20} className="text-gray-400" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Security First Compliance</h4>
                            <p className="text-gray-500 text-sm font-medium">Architectures built for SOC 2, HIPAA, and GDPR standards.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
