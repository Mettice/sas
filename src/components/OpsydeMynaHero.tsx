import * as React from 'react';
import {
  Activity,
  ArrowRight,
  BarChart,
  Menu,
  Plug,
  Sparkles,
  Zap,
} from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const navigationItems = [
  { title: 'SOLUTIONS', href: '#' },
  { title: 'INDUSTRIES', href: '#' },
  { title: 'RESOURCES', href: '#' },
  { title: 'CASE STUDIES', href: '#' },
];

const labels = [
  { icon: Sparkles, label: 'AI Strategy & Roadmapping' },
  { icon: Plug, label: 'Automation Engineering' },
  { icon: Activity, label: 'Data & Analytics Platforms' },
];

const features = [
  {
    icon: BarChart,
    label: 'Advanced Analytics',
    description:
      'Gain deeper insights from your data with our cutting-edge predictive models.',
  },
  {
    icon: Zap,
    label: 'Intelligent Automation',
    description: 'Streamline your processes with AI-powered automation solutions.',
  },
  {
    icon: Activity,
    label: 'Real-time Insights',
    description:
      'Make informed decisions faster with our real-time data processing capabilities.',
  },
];

interface OpsydeMynaHeroProps {
  onScrollToContact?: () => void;
  onScrollToCaseStudies?: () => void;
  theme?: 'dark' | 'light';
}

export function OpsydeMynaHero({
  onScrollToContact,
  onScrollToCaseStudies,
  theme = 'dark',
}: OpsydeMynaHeroProps) {
  const controls = useAnimation();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  React.useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const isDark = theme === 'dark';

  const titleWords = [
    'THE',
    'AI',
    'REVOLUTION',
    'FOR',
    'BUSINESS',
    'INTELLIGENCE',
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: isDark ? '#020202' : '#ffffff' }}
    >
      {isDark && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: '4rem 4rem',
              maskImage:
                'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%)',
            }}
          />
          <motion.div
            className="absolute w-[1000px] h-[600px] rounded-[100%] pointer-events-none z-0 mix-blend-screen"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, rgba(99,102,241,0) 70%)',
              top: '-300px',
              left: '50%',
              x: '-50%',
            }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-12 py-10">
      <main>
        <section className="container py-24">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ filter: 'blur(10px)', opacity: 0, y: 50 }}
              animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`relative font-mono text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {titleWords.map((text, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                  }}
                  className="inline-block mx-2 md:mx-4"
                >
                  {text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className={`mx-auto mt-8 max-w-2xl text-xl font-mono ${
                isDark ? 'text-white/70' : 'text-neutral-700'
              }`}
            >
              Opsyde empowers businesses with cutting-edge AI solutions to transform
              data into actionable insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              {labels.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.8 + index * 0.15,
                    duration: 0.6,
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                  }}
                  className="flex items-center gap-2 px-6"
                >
                  <feature.icon className="h-5 w-5 text-[#FF6B2C]" />
                  <span
                    className={`text-sm font-mono ${
                      isDark ? 'text-white/80' : 'text-neutral-800'
                    }`}
                  >
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.4,
                duration: 0.6,
                type: 'spring',
                stiffness: 100,
                damping: 10,
              }}
            >
              <button
                type="button"
                onClick={onScrollToContact}
                className="cursor-pointer rounded-none mt-12 bg-[#FF6B2C] hover:bg-[#FF6B2C]/90 font-mono text-sm font-medium text-white px-6 py-3 inline-flex items-center gap-1"
              >
                GET STARTED <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        <section className="container" ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.0,
              duration: 0.6,
              type: 'spring',
              stiffness: 100,
              damping: 10,
            }}
            className={`text-center text-4xl font-mono font-bold mb-6 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Unlock the Power of AI
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="grid md:grid-cols-3 max-w-6xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 3.2 + index * 0.2,
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                }}
                className={`flex flex-col items-center text-center p-8 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="mb-6 rounded-full bg-[#FF6B2C]/10 p-4">
                  <feature.icon className="h-8 w-8 text-[#FF6B2C]" />
                </div>
                <h3
                  className={`mb-4 text-xl font-mono font-bold ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {feature.label}
                </h3>
                <p
                  className={`font-mono text-sm leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-neutral-600'
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      </div>
    </section>
  );
}

