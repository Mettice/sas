import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const footerLinks = {
    Services: [
        'Workflow Automation',
        'AI Integration',
        'Data Automation',
        'Lead Generation',
        'CRM Integration',
    ],
    Company: ['About Us', 'Case Studies', 'Process', 'Capabilities', 'Templates'],
    Support: ['Contact Us', 'Book a Call', 'Documentation', 'FAQ'],
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
        <footer className="bg-slate-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <button
                            onClick={() => scrollTo('hero')}
                            className="flex items-center gap-2.5 mb-4 focus:outline-none group"
                        >
                            <img src="/logo.png" alt="OpSyde" className="w-8 h-8 group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-white">OpSyde</span>
                        </button>
                        <p className="text-sm leading-relaxed mb-6 max-w-xs">
                            Enterprise AI & automation consultancy helping businesses unlock measurable
                            productivity gains through intelligent workflow design and implementation.
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
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                                    whileHover={{ y: -2 }}
                                >
                                    <Icon size={16} className="text-gray-300" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h4 className="text-white text-sm font-semibold mb-4">{group}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <button
                                            className="text-sm text-gray-400 hover:text-white transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
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
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} OpSyde. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                        <button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                            Privacy Policy
                        </button>
                        <button className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                            Terms of Service
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};
