import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lightbulb } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
    scrolled: boolean;
    theme: 'dark' | 'light';
    onToggleTheme: () => void;
}

const navLinks = [
    { label: 'Stack', section: 'stack' },
    { label: 'Services', section: 'solutions' },
    { label: 'Process', section: 'process' },
    { label: 'Case Studies', section: 'case-studies' },
    { label: 'Infra', section: 'capabilities' },
];

export const Navigation: React.FC<NavigationProps> = ({ scrolled, theme, onToggleTheme }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNav = (section?: string) => {
        setMobileOpen(false);
        if (!section) {
            if (location.pathname !== '/') navigate('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
            }, 120);
        } else {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#05070a]/90 backdrop-blur-md border-b border-white/5'
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => handleNav()}
                        className="flex items-center gap-2.5 focus:outline-none group"
                        aria-label="Go to home"
                    >
                        <img
                            src="/logo.png"
                            alt="OpSyde"
                            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="flex flex-col items-start leading-none">
                            <span
                                className="text-xl font-bold tracking-tight text-white transition-colors duration-300"
                            >
                                OpSyde
                            </span>
                            <span
                                className="text-[9px] font-mono tracking-[0.25em] uppercase transition-colors duration-300 mt-0.5 text-[#d8ff3d]"
                            >
                                AI Infrastructure
                            </span>
                        </div>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.section}
                                onClick={() => handleNav(link.section)}
                                className="text-sm font-medium transition-colors duration-200 focus:outline-none text-white/70 hover:text-[#d8ff3d]"
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={onToggleTheme}
                            className="p-2 rounded-full border text-sm flex items-center justify-center transition-colors border-white/15 text-white/70 hover:text-white hover:border-white/30"
                            aria-label="Toggle hero theme"
                        >
                            <Lightbulb
                                className={`w-4 h-4 ${
                                    theme === 'light' ? 'fill-yellow-300 text-yellow-400' : ''
                                }`}
                            />
                        </button>

                        <motion.button
                            onClick={() =>
                                window.open('https://calendly.com/opsyde-info/30min', '_blank', 'noopener noreferrer')
                            }
                            className="bg-[#d8ff3d] hover:bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 focus:outline-none"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            data-testid="nav-book-call"
                        >
                            Book architect call
                        </motion.button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-[#05070a]/95 backdrop-blur-md border-b border-white/10 shadow-lg md:hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.section}
                                    onClick={() => handleNav(link.section)}
                                    className="text-left px-4 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-[#d8ff3d] text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    window.open('https://calendly.com/opsyde-info/30min', '_blank', 'noopener noreferrer');
                                }}
                                className="mt-2 w-full bg-[#d8ff3d] text-black text-sm font-semibold px-5 py-3 rounded-full"
                            >
                                Book architect call
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
