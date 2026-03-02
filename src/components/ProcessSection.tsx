import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, GraduationCap, ArrowRight } from 'lucide-react';

const ProcessSection: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="process" className="relative py-32 border-y border-white/5" style={{ background: '#050505' }}>

            {/* Background gradients */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen" />
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
                                <div className="w-10 h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" />
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400">
                                    Engagement Model
                                </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tighter">
                                Accelerating adoption <br />
                                <span className="text-gray-500">at every level.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-400 leading-relaxed font-medium">
                                <p>
                                    Technology alone doesn't generate value. Success requires aligning your organizational culture, data foundations, and practical AI applications into a cohesive engine.
                                </p>
                                <p>
                                    Our three-phase framework is designed to deliver immediate results for SMBs while establishing the governance required for enterprise-scale transformation.
                                </p>
                            </div>

                            {/* Stat callouts */}
                            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                                <div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">10×</div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Efficiency Target</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-white mb-2 tracking-tighter">100%</div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Tech Agnostic</div>
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
                                style={{ background: '#0a0a0a' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                                        <Search size={24} />
                                    </div>
                                    <span className="text-sm font-black text-white/20 group-hover:text-indigo-500/40 transition-colors">PHASE 01</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Discovery & Strategy</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6">
                                    We audit your current data maturity and identify high-value "Quick Wins". Whether you're a 10-person agency or a global firm, we map the exact use cases that drive the highest ROI.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {['Gap Analysis', 'ROI Mapping', 'Tool Selection', 'Strategic Roadmap'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                            <ArrowRight size={12} className="text-indigo-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Phase 2 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                style={{ background: '#0a0a0a' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                                        <Lightbulb size={24} />
                                    </div>
                                    <span className="text-sm font-black text-white/20 group-hover:text-emerald-500/40 transition-colors">PHASE 02</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Foundation & Architecture</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6">
                                    We build the infrastructure for scale. This involves setting up secure cloud foundations and deploying production-grade AI agents and RAG systems tailored to your workflows.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {['Secure Cloud Build', 'AI Orchestration', 'Data Pipelines', 'API Integration'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                            <ArrowRight size={12} className="text-emerald-500" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Phase 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                style={{ background: '#0a0a0a' }}
                                className="relative rounded-2xl p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
                                        <GraduationCap size={24} />
                                    </div>
                                    <span className="text-sm font-black text-white/20 group-hover:text-amber-500/40 transition-colors">PHASE 03</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Run & Optimise</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6">
                                    Once live, we stay close to your operations – tracking performance, closing edge cases, and evolving automations as your business changes.
                                </p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {['SLAs & Monitoring', 'Experimentation & A/B Tests', 'Change Management', 'Ongoing Support'].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                                            <ArrowRight size={12} className="text-amber-500" /> {item}
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
