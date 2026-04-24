import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';

const ProcessSection: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="process" className="relative py-32 border-y border-white/5" style={{ background: '#050607' }}>

            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen" style={{ background: 'rgba(216,255,61,0.06)' }} />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] mix-blend-screen" style={{ background: 'rgba(255,161,74,0.05)' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start" ref={ref}>

                    {/* Left: Engagement Narrative */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-px bg-[#d8ff3d]" />
                                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d8ff3d]">
                                    /engagement model
                                </span>
                            </div>
                            <h2
                                className="text-white mb-8 leading-[0.95] tracking-tight"
                                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', fontWeight: 500 }}
                            >
                                From zero to <br />
                                <span
                                    className="italic text-white/55"
                                    style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                                >
                                    production-grade AI.
                                </span>
                            </h2>
                            <div className="space-y-6 text-lg text-white/55 leading-relaxed font-light">
                                <p>
                                    Infrastructure is not a deck. It&apos;s code, SLAs and on-call rotations. We deliver in three tight phases — each ending with something running in production on your stack.
                                </p>
                                <p>
                                    Whether you&apos;re a ten-person team evaluating your first model or a global firm consolidating twelve AI vendors, the framework adapts to the scope.
                                </p>
                            </div>

                            {/* Stat callouts */}
                            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">8 wks</div>
                                    <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.25em]">To Production</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">10+</div>
                                    <div className="text-[10px] text-white/40 font-mono uppercase tracking-[0.25em]">Models Routed</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: The Phases */}
                    <div className="lg:col-span-7">
                        <div className="space-y-6">

                            {/* Phase 1 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                style={{ background: '#0a0c10' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-[#d8ff3d]/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border text-[#d8ff3d]" style={{ background: 'rgba(216,255,61,0.08)', borderColor: 'rgba(216,255,61,0.25)' }}>
                                        <Search size={24} />
                                    </div>
                                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/25 group-hover:text-[#d8ff3d]/60 transition-colors">PHASE / 01</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Audit &amp; Strategy</h3>
                                <p className="text-white/55 text-base leading-relaxed mb-6 font-light">
                                    Three days on-site (or remote) mapping your traffic patterns, latency budgets, compliance boundaries and existing model spend. We deliver a routing topology and a cost-per-token baseline.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                    {['Traffic audit', 'Latency budgeting', 'Model benchmarks', 'Routing topology'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-[12px] font-mono tracking-wide text-white/55">
                                            <ArrowRight size={12} className="text-[#d8ff3d]" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Phase 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                style={{ background: '#0a0c10' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-[#ffa14a]/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border text-[#ffa14a]" style={{ background: 'rgba(255,161,74,0.08)', borderColor: 'rgba(255,161,74,0.25)' }}>
                                        <Lightbulb size={24} />
                                    </div>
                                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/25 group-hover:text-[#ffa14a]/60 transition-colors">PHASE / 02</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Build &amp; Deploy</h3>
                                <p className="text-white/55 text-base leading-relaxed mb-6 font-light">
                                    We ship the router, connect your first two or three models, wire in guardrails, PII redaction and eval loops. Deployed on your VPC or our managed GPU fleet — zero glue code left behind.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                    {['Router on VPC', 'Model connectors', 'Eval pipelines', 'Observability stack'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-[12px] font-mono tracking-wide text-white/55">
                                            <ArrowRight size={12} className="text-[#ffa14a]" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Phase 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{ background: '#0a0c10' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-white/20 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center border text-white" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.15)' }}>
                                        <GraduationCap size={24} />
                                    </div>
                                    <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-white/25 group-hover:text-white/60 transition-colors">PHASE / 03</span>
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4 tracking-tight">Run &amp; Evolve</h3>
                                <p className="text-white/55 text-base leading-relaxed mb-6 font-light">
                                    Our pod stays on — rotating to new models as they ship (Claude 5, GPT-6, etc.), tuning prompts, watching drift, and keeping your costs and latency flat as traffic grows.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                                    {['24/7 on-call pod', 'Quarterly model reviews', 'Drift alerting', 'Predictable retainer'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-[12px] font-mono tracking-wide text-white/55">
                                            <ArrowRight size={12} className="text-white/80" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export { ProcessSection };
