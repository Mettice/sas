import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, GraduationCap, Users, BookOpen, Globe, Shield } from 'lucide-react';

/* ─────────────────────────────────────────────
   Consultancy Pillars Data
───────────────────────────────────────────── */
const pillars = [
    {
        icon: Cloud,
        title: 'Technology Agnostic',
        description:
            "We partner with the industry's leading cloud providers (AWS, GCP, Azure) to design secure architectures that fit your existing environment without vendor lock-in.",
        accent: '#0ea5e9', // sky
    },
    {
        icon: Users,
        title: 'Ops & Automation Pods',
        description:
            'Cross-functional squads that sit close to your teams, continuously identifying opportunities to streamline operations and ship new automations.',
        accent: '#f59e0b', // amber
    },
    {
        icon: BookOpen,
        title: 'Data Foundations',
        description:
            'Establishing the fundamentals of data governance, security, and compliance so AI initiatives stay reliable and auditable as they scale.',
        accent: '#10b981', // emerald
    },
    {
        icon: GraduationCap,
        title: 'On-the-Job Enablement',
        description:
            'Instead of generic academies, we coach your teams inside live projects so new capabilities stick and translate into day-to-day habits.',
        accent: '#8b5cf6', // violet
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
                        <div className="w-10 h-1 bg-sky-500 rounded-full" />
                        <span className="text-xs font-bold tracking-[0.2em] text-sky-400 uppercase">
                            Operational Capabilities
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl tracking-tighter"
                    >
                        Building the capabilities <br />
                        <span className="text-gray-500">to run AI-powered operations every day.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-xl text-white/50 max-w-2xl font-medium leading-relaxed"
                    >
                        We don&apos;t just deliver software. We make sure your operations, data, and people can sustain AI systems long after the first launch.
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
