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
    { label: 'Solutions', section: 'solutions' },
    { label: 'Process', section: 'process' },
    { label: 'Case Studies', section: 'case-studies' },
    { label: 'Capabilities', section: 'capabilities' },
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
                        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
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
                        <span
                            className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                                scrolled ? 'text-gray-900' : 'text-white'
                            }`}
                        >
                            OpSyde
                        </span>
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.section}
                                onClick={() => handleNav(link.section)}
                                className={`text-sm font-medium transition-colors duration-200 focus:outline-none ${scrolled
                                        ? 'text-gray-600 hover:text-gray-900'
                                        : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                        <button
                            onClick={onToggleTheme}
                            className={`p-2 rounded-full border text-sm flex items-center justify-center transition-colors ${
                                scrolled
                                    ? 'border-gray-200 text-gray-700 hover:bg-gray-100'
                                    : 'border-white/40 text-white hover:bg-white/10'
                            }`}
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
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            Book a Call
                        </motion.button>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                            }`}
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
                        className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg md:hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <button
                                    key={link.section}
                                    onClick={() => handleNav(link.section)}
                                    className="text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    window.open('https://calendly.com/opsyde-info/30min', '_blank', 'noopener noreferrer');
                                }}
                                className="mt-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold px-5 py-3 rounded-lg"
                            >
                                Book a Call
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
