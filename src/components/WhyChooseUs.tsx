import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
const useCounter = (target: number, duration = 2, shouldStart = false) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!shouldStart) return;
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [target, duration, shouldStart]);
    return count;
};

/* ─────────────────────────────────────────────
   Stats
───────────────────────────────────────────── */
const stats = [
    { value: 100, suffix: '+', label: 'Clients Automated' },
    { value: 4, suffix: ' wks', label: 'Avg. Time to Launch' },
    { value: 98, suffix: '%', label: 'Client Retention' },
    { value: 6, suffix: 'x', label: 'Avg. Efficiency Gain' },
];

const AnimatedStat: React.FC<{ stat: typeof stats[0]; animate: boolean }> = ({ stat, animate }) => {
    const count = useCounter(stat.value, 1.8, animate);
    return (
        <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-white mb-1 tabular-nums">
                {count}
                <span className="text-2xl lg:text-3xl" style={{ color: '#818cf8' }}>{stat.suffix}</span>
            </div>
            <div className="text-sm text-white/40 font-medium">{stat.label}</div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Feature rows
───────────────────────────────────────────── */
const features = [
    {
        number: '01',
        headline: 'Built around your business, not a template',
        body: 'Every engagement starts with discovery. We map your current processes, identify friction, and design automation that fits — not a generic package.',
        visual: {
            lines: [
                { label: 'Process Review', width: 90 },
                { label: 'Custom Architecture', width: 78 },
                { label: 'Tool Selection', width: 65 },
                { label: 'ROI Modelling', width: 85 },
            ],
        },
    },
    {
        number: '02',
        headline: 'Live in weeks, not quarters',
        body: 'Our proven methodology gets your first automations running in 2–4 weeks. You see results — then we scale.',
        visual: {
            timeline: ['Discovery', 'Design', 'Build', 'Deploy', 'Optimise'],
        },
    },
    {
        number: '03',
        headline: 'Continuous improvement — not a one-off project',
        body: 'We monitor performance, surface edge cases, and keep your automations evolving as your business does. Ongoing support included.',
        visual: {
            pulse: true,
        },
    },
];

const BarVisual: React.FC<{ lines: { label: string; width: number }[]; animate: boolean }> = ({ lines, animate }) => (
    <div className="space-y-3">
        {lines.map((l, i) => (
            <div key={i}>
                <div className="flex justify-between text-xs text-white/40 mb-1">
                    <span>{l.label}</span>
                    <span>{l.width}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #6366f1, #a78bfa)' }}
                        initial={{ width: 0 }}
                        animate={animate ? { width: `${l.width}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                    />
                </div>
            </div>
        ))}
    </div>
);

const TimelineVisual: React.FC<{ steps: string[]; animate: boolean }> = ({ steps, animate }) => (
    <div className="flex items-center gap-0">
        {steps.map((step, i) => (
            <React.Fragment key={i}>
                <motion.div
                    className="flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: i * 0.2 }}
                >
                    <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                        animate={animate ? { boxShadow: ['0 0 0 rgba(99,102,241,0)', '0 0 16px rgba(99,102,241,0.6)', '0 0 0 rgba(99,102,241,0)'] } : {}}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    >
                        {i + 1}
                    </motion.div>
                    <span className="text-white/40 text-xs mt-2 text-center w-12 leading-tight">{step}</span>
                </motion.div>
                {i < steps.length - 1 && (
                    <motion.div
                        className="flex-1 h-px mx-1 mb-5"
                        style={{ background: 'rgba(99,102,241,0.3)' }}
                        initial={{ scaleX: 0 }}
                        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.2 + 0.2 }}
                    />
                )}
            </React.Fragment>
        ))}
    </div>
);

const PulseVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
    <div className="flex items-center justify-center py-4">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: 'rgba(99,102,241,0.4)' }}
                initial={{ width: 40, height: 40, opacity: 0.8 }}
                animate={animate ? {
                    width: [40, 120 + i * 60],
                    height: [40, 120 + i * 60],
                    opacity: [0.7, 0],
                } : {}}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, ease: 'easeOut' }}
            />
        ))}
        <div
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 20px rgba(99,102,241,0.5)' }}
        >
            <motion.div
                className="w-3 h-3 rounded-full bg-white"
                animate={animate ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
        </div>
    </div>
);

/* ─────────────────────────────────────────────
   Feature Row component
───────────────────────────────────────────── */
const FeatureRow: React.FC<{ feature: typeof features[0]; index: number }> = ({ feature, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!isEven ? 'direction-reverse' : ''}`}
        >
            {/* Text side */}
            <motion.div
                className={isEven ? 'lg:order-1' : 'lg:order-2'}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#6366f1' }}>
                    {feature.number}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5 leading-snug">
                    {feature.headline}
                </h3>
                <p className="text-white/50 leading-relaxed text-base">{feature.body}</p>
            </motion.div>

            {/* Visual side */}
            <motion.div
                className={`relative rounded-2xl p-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
                {feature.visual.lines && (
                    <BarVisual lines={feature.visual.lines} animate={inView} />
                )}
                {feature.visual.timeline && (
                    <TimelineVisual steps={feature.visual.timeline} animate={inView} />
                )}
                {feature.visual.pulse && (
                    <PulseVisual animate={inView} />
                )}
            </motion.div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Section export
───────────────────────────────────────────── */
export const WhyChooseUs: React.FC = () => {
    const statsRef = useRef<HTMLDivElement>(null);
    const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

    return (
        <section className="relative py-28 overflow-hidden" style={{ background: '#080810' }}>
            {/* Top gradient separator */}
            <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

                {/* Animated stats bar */}
                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 p-8 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {stats.map((stat, i) => (
                        <AnimatedStat key={i} stat={stat} animate={statsInView} />
                    ))}
                </motion.div>

                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.span
                        className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border mb-5"
                        style={{ color: '#818cf8', borderColor: 'rgba(129,140,248,0.3)', background: 'rgba(99,102,241,0.08)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        Why OpSyde
                    </motion.span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
                        The way enterprise
                        <br />
                        <span
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(90deg, #818cf8, #c084fc)' }}
                        >
                            automation should work
                        </span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Not templates. Not guesswork. A structured approach that delivers measurable
                        results from day one.
                    </p>
                </motion.div>

                {/* Feature rows */}
                <div className="space-y-24">
                    {features.map((feat, i) => (
                        <FeatureRow key={i} feature={feat} index={i} />
                    ))}
                </div>
            </div>

            {/* Bottom gradient separator */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)' }}
            />
        </section>
    );
};
