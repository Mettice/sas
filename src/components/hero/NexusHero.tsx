import * as React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Sparkles, Shield, Activity } from 'lucide-react';
import { NeuralCore3D } from './NeuralCore3D';

/* ──────────────────────────────────────────────
   Platform chips orbiting the hero (HTML/CSS 3D)
   These simulate AI platforms integrating to the core
────────────────────────────────────────────── */
const platforms = [
  { name: 'Claude', color: '#CC785C', abbr: 'CL' },
  { name: 'OpenAI', color: '#10A37F', abbr: 'AI' },
  { name: 'Gemini', color: '#4285F4', abbr: 'GM' },
  { name: 'Llama', color: '#0866FF', abbr: 'LL' },
  { name: 'Mistral', color: '#FA520F', abbr: 'MI' },
  { name: 'NVIDIA', color: '#76B900', abbr: 'NV' },
  { name: 'HuggingFace', color: '#FFD21E', abbr: 'HF' },
  { name: 'Perplexity', color: '#20808D', abbr: 'PX' },
];

interface NexusHeroProps {
  onScrollToContact?: () => void;
  onScrollToCaseStudies?: () => void;
}

export const NexusHero: React.FC<NexusHeroProps> = ({
  onScrollToContact,
  onScrollToCaseStudies,
}) => {
  return (
    <section
      className="relative min-h-[100vh] w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% 0%, #0a0f14 0%, #05070a 55%, #020304 100%)',
      }}
      data-testid="nexus-hero"
    >
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(216,255,61,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(216,255,61,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '5rem 5rem',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Noise / grain */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.07] noise-texture" />

      {/* Accent halo */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full pointer-events-none blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(216,255,61,0.16) 0%, rgba(216,255,61,0) 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[500px] rounded-full pointer-events-none blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,161,74,0.10) 0%, transparent 70%)',
        }}
      />

      {/* 3D Canvas - positioned on the right side only */}
      <div className="absolute top-0 right-0 h-full w-full lg:w-[55%] z-0 pointer-events-none">
        <NeuralCore3D />
      </div>

      {/* Vignette over left content for legibility */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[60%] z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(2,3,4,0.95) 0%, rgba(2,3,4,0.7) 55%, rgba(2,3,4,0) 100%)',
        }}
      />

      {/* Top micro-bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d8ff3d]/30 bg-black/40 backdrop-blur-md"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[#d8ff3d] animate-ping opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d8ff3d]" />
        </span>
        <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#d8ff3d]">
          Operational / v2.4 / 12 regions
        </span>
      </motion.div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24 min-h-[100vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left text */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-px bg-[#d8ff3d]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#d8ff3d]/80">
                AI Infrastructure Agency · est. 2022
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-white leading-[0.92] tracking-tight"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 500,
              }}
              data-testid="hero-headline"
            >
              We architect the{' '}
              <span className="relative inline-block">
                <span
                  className="italic font-serif text-[#d8ff3d]"
                  style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
                >
                  intelligence
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d8ff3d] via-[#ffa14a] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.1, duration: 0.9 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
              <br />
              layer of modern{' '}
              <span
                className="italic text-white/70"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
              >
                enterprises.
              </span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 max-w-xl text-lg lg:text-xl text-white/60 leading-relaxed font-light"
              data-testid="hero-subcopy"
            >
              <span className="text-white font-medium">OpSyde</span> is the AI
              infrastructure agency for teams that refuse to pick a single model.
              We orchestrate <em className="text-[#d8ff3d] not-italic">Claude</em>,{' '}
              <em className="text-[#d8ff3d] not-italic">GPT&#8209;5</em>,{' '}
              <em className="text-[#d8ff3d] not-italic">Gemini</em>,{' '}
              <em className="text-[#d8ff3d] not-italic">Llama</em> &amp; open-source
              stacks behind one private control plane — built, shipped and run by our pod.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-12 flex flex-wrap gap-4 items-center"
            >
              <button
                type="button"
                onClick={onScrollToContact}
                data-testid="hero-cta-primary"
                className="group relative inline-flex items-center gap-3 px-7 py-4 bg-[#d8ff3d] text-black font-semibold text-sm tracking-wide rounded-full transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(216,255,61,0.4)]"
              >
                Architect my stack
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                type="button"
                onClick={onScrollToCaseStudies}
                data-testid="hero-cta-secondary"
                className="group inline-flex items-center gap-2 px-6 py-4 text-white/80 hover:text-white font-mono text-sm tracking-wider uppercase transition-colors border border-white/10 hover:border-white/30 rounded-full backdrop-blur-sm"
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#d8ff3d]" />
                See production deployments
              </button>
            </motion.div>

            {/* Pill strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-16 flex flex-wrap gap-6"
            >
              {[
                { icon: Zap, label: 'Sub-100ms inference' },
                { icon: Shield, label: 'SOC 2 · HIPAA · GDPR' },
                { icon: Activity, label: 'Live observability' },
                { icon: Sparkles, label: 'Any-model, any-cloud' },
              ].map((i) => (
                <div
                  key={i.label}
                  className="flex items-center gap-2 text-white/50"
                >
                  <i.icon className="w-4 h-4 text-[#d8ff3d]" />
                  <span className="text-[13px] font-mono tracking-wide">
                    {i.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - orbiting platform chips over 3D */}
          <div className="lg:col-span-5 relative h-[480px] hidden lg:block z-20">
            {platforms.map((p, i) => {
              const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 175;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.08, duration: 0.5 }}
                  className="absolute z-20"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.2,
                    }}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md bg-[#02030488] hover:bg-black transition-all cursor-default whitespace-nowrap shadow-xl"
                    style={{
                      borderColor: `${p.color}60`,
                      boxShadow: `0 0 24px ${p.color}25, inset 0 0 0 1px ${p.color}15`,
                    }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold font-mono"
                      style={{
                        background: `${p.color}35`,
                        color: p.color,
                      }}
                    >
                      {p.abbr}
                    </span>
                    <span className="text-[11px] font-mono tracking-wide text-white">
                      {p.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Center dotted ring */}
            <div
              className="absolute left-1/2 top-1/2 w-20 h-20 rounded-full border border-dashed border-[#d8ff3d]/40 animate-spin-slow"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </div>
        </div>

        {/* Bottom proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-20 lg:mt-28 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center"
        >
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/40">
            Trusted to run infra for
          </span>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {['BCG', 'HOLIDAY PIRATES', 'ANDZEN', 'NEXTGEN.AI', 'SYMBIOTIC LABS'].map(
              (logo) => (
                <span
                  key={logo}
                  className="text-white/40 hover:text-white transition-colors font-semibold tracking-[0.25em] text-xs"
                >
                  {logo}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#d8ff3d] to-transparent"
        />
      </motion.div>
    </section>
  );
};
