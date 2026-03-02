import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Rocket, Sparkles, Database, Server, BarChart3, ChevronRight } from 'lucide-react';

/* ─────────────────────────────────────────────
   Consultancy Services Data
───────────────────────────────────────────── */
const services = [
    {
        icon: Rocket,
        label: 'Strategy & Transformation',
        subtitle: 'From roadmap to operational reality',
        description:
            'We accompany businesses from initial strategy to deployment and team adoption. We leverage data across your organization to accelerate transformation and train your workforce for an AI-first era.',
        accent: '#6366f1', // indigo
        size: 'large',
    },
    {
        icon: Sparkles,
        label: 'AI Acceleration',
        subtitle: 'Generative & Agentic Solutions',
        description:
            'Grounded on solid data foundations, we develop tailored AI agents and GenAI solutions that optimize specific departments (Sales, Marketing, HR, Finance) and augment human capability.',
        accent: '#10b981', // emerald
        size: 'normal',
    },
    {
        icon: Database,
        label: 'Data Foundations & BI',
        subtitle: 'Governance that drives value',
        description:
            'We create effective data governance and management frameworks that ensure compliance while driving smarter results through advanced analytics and business intelligence.',
        accent: '#f59e0b', // amber
        size: 'normal',
    },
    {
        icon: Server,
        label: 'IT & Data Platforms',
        subtitle: 'Scalable, agnostic infrastructure',
        description:
            'We build data-centric IT ecosystems that treat data as a strategic asset. Our cloud solutions provide secure, secure infrastructure integrated with the industry\'s leading providers.',
        accent: '#0ea5e9', // sky
        size: 'normal',
    },
    {
        icon: BarChart3,
        label: 'Marketing Data & Digital',
        subtitle: 'Increasing ROI through agility',
        description:
            'Working at the intersection of marketing and data science, we manage complex cross-channel mechanisms through Customer Data Platforms to empower marketing teams and maximize ROI.',
        accent: '#8b5cf6', // violet
        size: 'large',
    },
];

/* ─────────────────────────────────────────────
   Animated Card Component
───────────────────────────────────────────── */
interface CardProps {
    service: (typeof services)[0];
    index: number;
}

const ServiceCard: React.FC<CardProps> = ({ service, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const isWide = service.size === 'large';

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-2xl overflow-hidden group border transition-all duration-500 ${hovered ? 'border-white/20' : 'border-white/5'
                } ${isWide ? 'lg:col-span-2' : 'col-span-1'}`}
            style={{ background: '#0a0a0a', minHeight: isWide ? 260 : 340 }}
        >
            {/* Background spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(500px circle at ${springX}px ${springY}px, ${service.accent}10 0%, transparent 65%)`,
                }}
            />

            <div className={`relative z-10 p-8 flex flex-col h-full ${isWide ? 'lg:flex-row lg:items-center lg:gap-12' : ''}`}>
                <div className={isWide ? 'flex-1 mb-6 lg:mb-0' : 'mb-8'}>
                    <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-500 mb-6"
                        style={{
                            background: hovered ? `${service.accent}15` : 'rgba(255,255,255,0.02)',
                            borderColor: hovered ? `${service.accent}30` : 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <service.icon size={24} style={{ color: hovered ? service.accent : '#9ca3af' }} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{service.label}</h3>
                    <p className="text-sm font-bold tracking-wider uppercase mb-1" style={{ color: `${service.accent}cc` }}>{service.subtitle}</p>
                </div>

                <div className={isWide ? 'flex-1' : ''}>
                    <p className="text-gray-400 leading-relaxed text-base font-medium">
                        {service.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white group-hover:translate-x-1 transition-transform cursor-pointer">
                        Explore practice <ChevronRight size={14} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Main Section Component
───────────────────────────────────────────── */
export const ServicesSection: React.FC = () => {
    return (
        <section id="solutions" className="relative py-32" style={{ background: '#020202' }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <div className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-10 h-1 bg-indigo-500 rounded-full" />
                        <span className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">Our Practices</span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter"
                        >
                            End-to-End solutions <br />
                            <span className="text-gray-500">for the AI-first economy.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-400 font-medium max-w-lg mb-4"
                        >
                            We combine deep business consulting with cutting-edge data science to architect, build, and scale your organization's AI capabilities.
                        </motion.p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {services.map((service, i) => (
                        <ServiceCard key={service.label} service={service} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};
