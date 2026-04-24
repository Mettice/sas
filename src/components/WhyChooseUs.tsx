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
   Infra metrics
───────────────────────────────────────────── */
const stats = [
    { value: 100, suffix: '+', label: 'Models Orchestrated' },
    { value: 98, suffix: 'ms', label: 'p50 Inference Latency' },
    { value: 99, suffix: '.99%', label: 'Router Uptime' },
    { value: 12, suffix: ' regions', label: 'GPU Footprint' },
];

const AnimatedStat: React.FC<{ stat: typeof stats[0]; animate: boolean }> = ({ stat, animate }) => {
    const count = useCounter(stat.value, 1.8, animate);
    return (
        <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-white mb-1 tabular-nums tracking-tight">
                {count}
                <span className="text-2xl lg:text-3xl text-[#d8ff3d]">{stat.suffix}</span>
            </div>
            <div className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                {stat.label}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Feature rows
───────────────────────────────────────────── */
const features = [
    {
        number: '01',
        headline: 'Architected around your data — not a framework',
        body: 'Every engagement starts with a three-day audit of your data, latency budgets and compliance boundaries. We then design a routing topology tailored to your traffic — not a reference architecture copied from a blog post.',
        visual: {
            lines: [
                { label: 'Traffic & latency audit', width: 92 },
                { label: 'Router topology design', width: 78 },
                { label: 'Model + GPU selection', width: 85 },
                { label: 'Cost-per-token modelling', width: 70 },
            ],
        },
    },
    {
        number: '02',
        headline: 'In production in weeks — not quarters',
        body: 'First router deployed on your VPC in 2–3 weeks. First model swap in week 4. Full multi-model orchestration with evals, guardrails and observability by week 8.',
        visual: {
            timeline: ['Audit', 'Router', 'Models', 'Guardrails', 'Scale'],
        },
    },
    {
        number: '03',
        headline: 'A pod that stays on — long after launch',
        body: 'Every deployment ships with a dedicated pod (engineer + SRE + product lead) that monitors drift, rotates models as new ones ship, and keeps your stack current with the frontier — on a predictable monthly retainer.',
        visual: {
            pulse: true,
        },
    },
];

const BarVisual: React.FC<{ lines: { label: string; width: number }[]; animate: boolean }> = ({ lines, animate }) => (
    <div className="space-y-3">
        {lines.map((l, i) => (
            <div key={i}>
                <div className="flex justify-between text-[11px] font-mono text-white/45 mb-1.5 tracking-wide">
                    <span>{l.label}</span>
                    <span className="text-[#d8ff3d]">{l.width}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #d8ff3d, #ffa14a)' }}
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
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-black font-mono"
                        style={{ background: '#d8ff3d' }}
                        animate={animate ? { boxShadow: ['0 0 0 rgba(216,255,61,0)', '0 0 18px rgba(216,255,61,0.7)', '0 0 0 rgba(216,255,61,0)'] } : {}}
                        transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity }}
                    >
                        {i + 1}
                    </motion.div>
                    <span className="text-white/50 text-[10px] font-mono tracking-wider uppercase mt-2 text-center w-14 leading-tight">{step}</span>
                </motion.div>
                {i < steps.length - 1 && (
                    <motion.div
                        className="flex-1 h-px mx-1 mb-5"
                        style={{ background: 'rgba(216,255,61,0.35)' }}
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
    <div className="flex items-center justify-center py-8 relative h-32">
        {[0, 1, 2].map((i) => (
            <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: 'rgba(216,255,61,0.45)' }}
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
            style={{ background: '#d8ff3d', boxShadow: '0 0 24px rgba(216,255,61,0.6)' }}
        >
            <motion.div
                className="w-3 h-3 rounded-full bg-black"
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
            {/* Text side */}
            <motion.div
                className={isEven ? 'lg:order-1' : 'lg:order-2'}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="text-[11px] font-mono tracking-[0.3em] uppercase mb-4 text-[#d8ff3d]">
                    /{feature.number}
                </div>
                <h3
                    className="text-white mb-5 leading-[1.1] tracking-tight"
                    style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)', fontWeight: 500 }}
                >
                    {feature.headline}
                </h3>
                <p className="text-white/55 leading-relaxed text-base font-light">{feature.body}</p>
            </motion.div>

            {/* Visual side */}
            <motion.div
                className={`relative rounded-2xl p-8 overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                style={{ background: 'rgba(216,255,61,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
                    style={{ background: 'rgba(216,255,61,0.18)' }}
                />
                <div className="relative">
                    {feature.visual.lines && (
                        <BarVisual lines={feature.visual.lines} animate={inView} />
                    )}
                    {feature.visual.timeline && (
                        <TimelineVisual steps={feature.visual.timeline} animate={inView} />
                    )}
                    {feature.visual.pulse && (
                        <PulseVisual animate={inView} />
                    )}
                </div>
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
        <section className="relative py-28 overflow-hidden" style={{ background: '#05070a' }}>
            <div
                className="pointer-events-none absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(216,255,61,0.5), transparent)' }}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

                {/* Stats bar */}
                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24 p-8 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
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
                        className="inline-block text-[11px] font-mono tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border border-[#d8ff3d]/30 text-[#d8ff3d] mb-6"
                        style={{ background: 'rgba(216,255,61,0.06)' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        /why OpSyde
                    </motion.span>
                    <h2
                        className="text-white mb-5 leading-[0.95] tracking-tight"
                        style={{ fontSize: 'clamp(2.25rem, 5vw, 4.5rem)', fontWeight: 500 }}
                    >
                        The way modern AI infra
                        <br />
                        <span
                            className="italic text-white/55"
                            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                        >
                            is actually supposed to ship.
                        </span>
                    </h2>
                    <p className="text-white/55 text-lg max-w-xl mx-auto font-light">
                        No vendor decks. No &ldquo;centers of excellence.&rdquo; Production systems, measurable latency, and a pod that stays on call.
                    </p>
                </motion.div>

                {/* Feature rows */}
                <div className="space-y-24">
                    {features.map((feat, i) => (
                        <FeatureRow key={i} feature={feat} index={i} />
                    ))}
                </div>
            </div>

            <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(216,255,61,0.5), transparent)' }}
            />
        </section>
    );
};
