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
      className={`relative px-4 sm:px-6 py-20 sm:py-32 text-center ${isDark ? '' : 'bg-white border-b border-gray-200 shadow-sm'}`}
      initial="initial"
      animate="animate"
    >
      {/* Animated Background Particles and Gradients: Only in dark mode */}
      {isDark && (
        <>
          <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-ping"></div>
            <div className="absolute bottom-40 left-20 w-1 h-1 bg-pink-400 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute top-60 left-1/2 w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-1 h-1 bg-orange-400 rounded-full opacity-70 animate-ping"></div>
          </div>
        </>
      )}

      <motion.div className="max-w-6xl mx-auto relative z-20">
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
        <motion.div className="relative w-full flex flex-col items-center justify-center mb-4 sm:mb-6" initial="initial" animate="animate">
          {/* Fallback solid color heading */}
          <h1
            className={`text-3xl sm:text-5xl md:text-7xl font-bold leading-tight z-10 relative ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            aria-hidden="false"
          >
            {splitText('Optimize Your Operations')}
            <br />
            {splitText('with Smart Automation')}
          </h1>
          {/* Gradient heading overlay */}
          <h1
            ref={titleRef}
            className={`text-3xl sm:text-5xl md:text-7xl font-bold leading-tight absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-clip-text text-transparent pointer-events-none select-none ${
              isDark
                ? 'bg-gradient-to-r from-white via-cyan-300 to-purple-400'
                : 'bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600'
            }`}
            aria-hidden="true"
          >
            {splitText('Optimize Your Operations')}
            <br />
            {splitText('with Smart Automation')}
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p 
          ref={subtitleRef}
          className={`text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto px-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          } leading-relaxed`}
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
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 relative overflow-hidden group"
            onClick={onOpenScheduling}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Book a Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
          
          <motion.button 
            className={`px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 text-cyan-600 border-cyan-400 bg-white hover:bg-cyan-50 hover:text-purple-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 relative overflow-hidden group`}
            onClick={onScrollToFeatures}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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