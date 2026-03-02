import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, MapPin, ArrowUpRight, MessageSquare, ArrowRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="relative py-32" style={{ background: '#020202' }}>

            {/* Background glow */}
            <div className="absolute inset-x-0 bottom-0 pointer-events-none overflow-hidden h-96">
                <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left column: Direct Messaging */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-1 bg-indigo-500 rounded-full" />
                            <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">
                                Initiate Project
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 leading-tight tracking-tighter">
                            Ready to redefine <br />
                            <span className="text-gray-500">your competitive baseline?</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg font-medium">
                            Whether you are looking for a rapid pilot or a full-scale digital overhaul, our team is ready to map your data potential to measurable business outcomes.
                        </p>

                        <div className="space-y-8 mb-16">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black tracking-widest text-gray-600 uppercase mb-1">Direct Inquiries</div>
                                    <a href="mailto:info@opsyde.com" className="text-lg font-bold text-white hover:text-indigo-400 transition-colors">
                                        info@opsyde.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black tracking-widest text-gray-600 uppercase mb-1">Global Presence</div>
                                    <div className="text-lg font-bold text-white">London • Sydney • Paris</div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-white font-bold mb-2">SMB Support</h4>
                                <p className="text-sm text-gray-500 font-medium">Implementation and scaling strategies for high-growth firms.</p>
                            </div>
                            <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
                                <h4 className="text-white font-bold mb-2">Enterprise</h4>
                                <p className="text-sm text-gray-500 font-medium">Strategic roadmaps and large-scale AI governance.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column: Form / CTAs */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Primary Discovery CTA */}
                        <div
                            className="p-10 rounded-3xl border border-indigo-500/20 bg-[#0a0a0a] group cursor-pointer hover:border-indigo-500/40 transition-all"
                            onClick={() => window.open('https://calendly.com/opsyde-info/30min', '_blank')}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Calendar size={32} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:rotate-45 transition-transform">
                                    <ArrowUpRight size={20} className="text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Book Discovery Call</h3>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-6">
                                Schedule a technical audit to scope your data foundations and identify AI adoption pools.
                            </p>
                            <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-indigo-400">
                                <span>View availability</span>
                                <div className="w-8 h-px bg-indigo-400/50" />
                            </div>
                        </div>

                        {/* General Request CTA */}
                        <div className="p-10 rounded-3xl border border-white/5 bg-[#0a0a0a] group cursor-pointer hover:border-white/20 transition-all">
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                                    <MessageSquare size={32} />
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ArrowRight size={20} className="text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-white mb-4 tracking-tighter">Submit RFP / Brief</h3>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed">
                                Already have a project brief? Share your requirements and our architects will be in touch within 24 hours.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
