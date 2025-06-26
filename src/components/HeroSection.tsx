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
  const particlesRef = useRef<HTMLDivElement>(null);

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

      // Title animation with character reveal
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

      // Parallax effect for background elements
      if (particlesRef.current) {
        parallax(particlesRef.current, 0.3);
      }

      // Animate CTA buttons on hover
      const buttons = ctaRef.current?.querySelectorAll('button');
      buttons?.forEach(button => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
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

  const colors = enhancedColors[isDark ? 'dark' : 'light'];

  return (
    <motion.section 
      ref={heroRef}
      className={`relative pt-32 pb-20 sm:pt-40 sm:pb-24 text-center ${isDark ? '' : 'bg-white border-b border-gray-200 shadow-sm'}`}
      initial="initial"
      animate="animate"
    >
      {/* Animated Gradient Background (dark mode only for now) */}
      {isDark && (
        <>
          <div className="absolute inset-0 -z-10 animate-gradient-hero" aria-hidden="true"></div>
          {/* Floating Particles */}
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-20 left-10 w-8 h-8 bg-cyan-400/40 rounded-full blur-2xl animate-float-slow"></div>
            <div className="absolute top-40 right-20 w-12 h-12 bg-purple-400/30 rounded-full blur-2xl animate-float-medium"></div>
            <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-pink-400/40 rounded-full blur-2xl animate-float-fast"></div>
            <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-green-400/30 rounded-full blur-2xl animate-float-medium"></div>
            <div className="absolute bottom-20 right-10 w-7 h-7 bg-orange-400/30 rounded-full blur-2xl animate-float-slow"></div>
          </div>
          {/* Animated Accent Elements */}
          <svg className="absolute left-12 top-32 w-16 h-16 opacity-30 pointer-events-none blur-sm animate-spin-slow" viewBox="0 0 100 100" fill="none"><polygon points="50,10 90,90 10,90" fill="#8b5cf6" /></svg>
          <svg className="absolute right-24 top-16 w-12 h-12 opacity-20 pointer-events-none animate-float-medium" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" fill="#06b6d4" /></svg>
          <svg className="absolute left-1/3 bottom-24 w-14 h-14 opacity-20 pointer-events-none animate-spin-reverse-slow" viewBox="0 0 100 100" fill="none"><polygon points="50,10 90,35 75,90 25,90 10,35" fill="#ec4899" /></svg>
          <svg className="absolute right-1/4 bottom-10 w-24 h-8 opacity-20 pointer-events-none animate-wiggle" viewBox="0 0 100 30" fill="none"><path d="M0,15 Q25,0 50,15 T100,15" stroke="#fbbf24" strokeWidth="4" fill="none" /></svg>
        </>
      )}

      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Logo */}
        <motion.div 
          ref={logoRef}
          className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8"
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            transition: { duration: 0.3 }
          }}
        >
          <img 
            src="/logo.png" 
            alt="OpSyde Logo" 
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </motion.div>
        
        {/* Main Title */}
        <motion.div className="relative w-full flex flex-col items-center justify-center mb-8" initial="initial" animate="animate">
          {/* Soft Glow Behind Heading (dark mode only) */}
          {isDark && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-3/4 h-2/3 -z-10 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 opacity-40 blur-3xl"></div>
          )}
          {/* Fallback solid color heading */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight z-10 relative ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            aria-hidden="false"
          >
            {splitText('Optimize Your Operations')}
            <br />
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {splitText('with Smart Automation')}
            </span>
          </h1>
          {/* Gradient heading overlay */}
          <h1
            ref={titleRef}
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-clip-text text-transparent pointer-events-none select-none ${
              isDark
                ? 'bg-gradient-to-r from-white via-cyan-300 to-purple-400'
                : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600'
            }`}
            aria-hidden="true"
          >
            {splitText('Optimize Your Operations')}
            <br />
            <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {splitText('with Smart Automation')}
            </span>
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p 
          ref={subtitleRef}
          className={`max-w-2xl mx-auto text-lg sm:text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-10 leading-relaxed`}
        >
          OpSyde helps businesses optimize and scale their operations through intelligent automation. 
          From lead generation to HR, email, and social media automation—unlock your team's full potential with our proven solutions.
        </motion.p>
        
        {/* Animated Beam Demo */}
        <motion.div 
          className="mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <AnimatedBeamDemo isDark={isDark} />
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          <motion.button 
            className={`relative group px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:opacity-90 text-white' 
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:opacity-90 text-white'
            }`}
            onClick={onOpenScheduling}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Book a Consultation</span>
            <div className="absolute inset-0 bg-white/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          </motion.button>
          
          <motion.button 
            className={`px-8 py-6 text-lg font-semibold border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
              isDark 
                ? 'text-cyan-400 border-cyan-400 bg-transparent hover:bg-cyan-400/10 hover:text-white hover:border-cyan-300' 
                : 'text-cyan-600 border-cyan-600 bg-transparent hover:bg-cyan-50 hover:text-purple-700 hover:border-purple-400'
            }`}
            onClick={onScrollToFeatures}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Features</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className={`w-6 h-10 border-2 rounded-full border-current ${
          isDark ? 'text-cyan-400' : 'text-gray-600'
        } flex justify-center`}>
          <div className={`w-1 h-3 bg-current rounded-full mt-2 animate-bounce`}></div>
        </div>
      </motion.div>
    </motion.section>
  );
}; 