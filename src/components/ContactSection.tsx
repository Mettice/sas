import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MapPin, ArrowUpRight, MessageSquare, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="relative py-32" style={{ background: '#020304' }}>

            {/* Background glow */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-96">
                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[340px] rounded-full blur-[100px]" style={{ background: 'rgba(216,255,61,0.12)' }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-px bg-[#d8ff3d]" />
                            <span className="text-[11px] font-mono tracking-[0.3em] text-[#d8ff3d] uppercase">
                                /start a build
                            </span>
                        </div>

                        <h2
                            className="text-white mb-8 leading-[0.95] tracking-tight"
                            style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', fontWeight: 500 }}
                        >
                            Ready to ship <br />
                            <span
                                className="italic text-white/55"
                                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                            >
                                multi-model infra?
                            </span>
                        </h2>

                        <p className="text-white/55 text-lg leading-relaxed mb-12 max-w-lg font-light">
                            Bring us a spec, a half-built prototype, or just a napkin sketch. We&apos;ll reply within 24 hours with a reference architecture and a 3-week plan to get it running on your cloud.
                        </p>

                        <div className="space-y-8 mb-16">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#d8ff3d] group-hover:border-[#d8ff3d]/30 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-1">Direct line</div>
                                    <a href="mailto:architects@opsyde.com" className="text-lg font-semibold text-white hover:text-[#d8ff3d] transition-colors">
                                        architects@opsyde.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#d8ff3d] group-hover:border-[#d8ff3d]/30 transition-colors" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-1">Pods located in</div>
                                    <div className="text-lg font-semibold text-white">London &middot; New York &middot; Singapore</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="text-[10px] font-mono tracking-[0.3em] text-[#d8ff3d] uppercase mb-2">/startup</div>
                                <h4 className="text-white font-semibold mb-2 tracking-tight">First model live</h4>
                                <p className="text-sm text-white/50 font-light">Router + Claude + one fallback. From zero to prod in 3 weeks.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                <div className="text-[10px] font-mono tracking-[0.3em] text-[#ffa14a] uppercase mb-2">/enterprise</div>
                                <h4 className="text-white font-semibold mb-2 tracking-tight">Platform consolidation</h4>
                                <p className="text-sm text-white/50 font-light">Replace 12 vendors with one private control plane. SOC 2 + HIPAA.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Primary CTA */}
                        <button
                            type="button"
                            onClick={() => window.open('https://calendly.com/opsyde-info/30min', '_blank', 'noopener noreferrer')}
                            className="w-full text-left p-10 rounded-3xl border border-[#d8ff3d]/30 group cursor-pointer hover:border-[#d8ff3d]/60 transition-all"
                            style={{ background: '#0a0d0a' }}
                            data-testid="contact-cta-book"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl border border-[#d8ff3d]/25 flex items-center justify-center text-[#d8ff3d]" style={{ background: 'rgba(216,255,61,0.08)' }}>
                                    <Calendar size={28} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:rotate-45 transition-transform">
                                    <ArrowUpRight size={20} className="text-white/70" />
                                </div>
                            </div>
                            <h3
                                className="text-white mb-4 tracking-tight"
                                style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 500 }}
                            >
                                Book architect call
                            </h3>
                            <p className="text-white/60 text-base font-light leading-relaxed mb-6">
                                30 minutes with a senior engineer. Walk us through your traffic, budget and compliance — leave with a reference architecture.
                            </p>
                            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#d8ff3d]">
                                <span>Pick a time</span>
                                <div className="w-8 h-px bg-[#d8ff3d]/50" />
                            </div>
                        </button>

                        {/* Secondary CTA */}
                        <button
                            type="button"
                            onClick={() => window.open('mailto:architects@opsyde.com?subject=Project%20Brief', '_blank')}
                            className="w-full text-left p-10 rounded-3xl border border-white/10 group cursor-pointer hover:border-white/25 transition-all"
                            style={{ background: '#0a0c10' }}
                            data-testid="contact-cta-brief"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                                    <MessageSquare size={28} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ArrowRight size={20} className="text-white/60" />
                                </div>
                            </div>
                            <h3
                                className="text-white mb-4 tracking-tight"
                                style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', fontWeight: 500 }}
                            >
                                Send a brief
                            </h3>
                            <p className="text-white/60 text-base font-light leading-relaxed">
                                Already have a spec? Drop it in our inbox and an architect will reply with a 3-week scope, a fixed price and a slot within 48 hours.
                            </p>
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
