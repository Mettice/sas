import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
    Platforms: [
        'Claude',
        'OpenAI GPT-5.2',
        'Gemini 3',
        'Llama 4',
        'NVIDIA NIM',
    ],
    Company: ['The Stack', 'Case Studies', 'Process', 'Infrastructure', 'Templates'],
    Support: ['Contact', 'Book Architect Call', 'Documentation', 'FAQ'],
};

export const FooterSection: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollTo = (id: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 120);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="text-white/60" style={{ background: '#020304', borderTop: '1px solid rgba(216,255,61,0.12)' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <button
                            onClick={() => scrollTo('hero')}
                            className="flex items-center gap-2.5 mb-4 focus:outline-none group"
                        >
                            <img src="/logo.png" alt="OpSyde" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-xl font-bold text-white">OpSyde</span>
                                <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-[#d8ff3d] mt-0.5">
                                    AI Infrastructure
                                </span>
                            </div>
                        </button>
                        <p className="text-sm leading-relaxed mb-6 max-w-xs font-light">
                            The AI infrastructure agency for teams that refuse to pick a single model. Router, GPUs, guardrails — engineered, shipped and operated by our pod.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                                { Icon: Mail, href: 'mailto:info@opsyde.com', label: 'Email' },
                            ].map(({ Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d8ff3d] hover:text-black hover:border-[#d8ff3d] transition-all"
                                    whileHover={{ y: -2 }}
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#d8ff3d] mb-5">/{group}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <button
                                            className="text-sm text-white/55 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-left font-light"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] font-mono tracking-wider text-white/35">
                        &copy; {new Date().getFullYear()} OpSyde &middot; AI Infrastructure Agency
                    </p>
                    <div className="flex items-center gap-6 text-[11px] font-mono tracking-wider text-white/35">
                        <button className="hover:text-[#d8ff3d] transition-colors bg-transparent border-none cursor-pointer">
                            Privacy
                        </button>
                        <button className="hover:text-[#d8ff3d] transition-colors bg-transparent border-none cursor-pointer">
                            Terms
                        </button>
                        <span className="text-[#d8ff3d]">v2.4</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
