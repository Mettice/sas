import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  textReveal, 
  charReveal, 
  floating, 
  parallax,
  enhancedColors 
} from '../utils/gsap';
import AnimatedBeamDemo from './animated-beam-demo';
import { Sparkles, ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  isDark: boolean;
  onOpenScheduling: () => void;
  onScrollToFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  isDark, 
  onOpenScheduling, 
  onScrollToFeatures 
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 50
      });

      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 0.5
      });

      // Create timeline for hero animations
      const tl = gsap.timeline();

      // Logo animation
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      });

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');

      // Animate title characters
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(chars, 
          { 
            opacity: 0, 
            y: 50, 
            rotationX: 90 
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.03,
            delay: 0.5
          }
        );
      }

      // Subtitle animation
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.2');

      // CTA buttons animation
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');

      // Floating animations
      if (logoRef.current) {
        floating(logoRef.current, { y: -15, duration: 3 });
      }

      // Animate CTA buttons on hover
      const buttons = ctaRef.current?.querySelectorAll('button');
      buttons?.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });

      // After all animations, ensure heading is visible
      tl.set(titleRef.current, { opacity: 1 });

    }, heroRef);

    return () => ctx.revert();
  }, [isDark]);

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
      initial="initial"
      animate="animate"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800/10 via-transparent to-gray-800/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gray-500/5 rounded-full filter blur-3xl"></div>
      </div>
      <motion.div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <Sparkles className="h-10 w-10 text-yellow-500" />
          </div>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="block">Optimize Your Operations</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-yellow-400">
              with Smart Automation
            </span>
          </h1>
          <motion.p 
            ref={subtitleRef}
            className="mt-6 text-xl text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            OpSyde helps businesses optimize and scale their operations through intelligent automation. From lead generation to HR, email, and social media automation—unlock your team's full potential with our proven solutions.
          </motion.p>
          <motion.div className="mb-16 max-w-4xl mx-auto px-4">
            <AnimatedBeamDemo isDark={isDark} />
          </motion.div>
          <motion.div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <motion.button 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 text-lg font-bold rounded-xl shadow-lg transition-all duration-300"
              onClick={onOpenScheduling}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Consultation
            </motion.button>
            <motion.button 
              className="border-2 border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-500 px-8 py-6 text-lg font-bold rounded-xl transition-all duration-300"
              onClick={onScrollToFeatures}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Features
            </motion.button>
          </motion.div>
          <div className="mt-16 flex justify-center">
            <div className="animate-bounce">
              <ChevronRight className="h-8 w-8 rotate-90 text-white/50" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}; 