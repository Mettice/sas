import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Enhanced color schemes
export const enhancedColors = {
  dark: {
    primary: {
      from: '#2d1a4a',
      via: '#0ea5e9',
      to: '#06b6d4'
    },
    accent: {
      pink: '#ec4899',
      blue: '#0ea5e9',
      cyan: '#06b6d4',
      purple: '#8b5cf6',
      magenta: '#a21caf',
      green: '#10b981',
      orange: '#f59e0b'
    },
    background: {
      from: '#1a1333',
      via: '#232946',
      to: '#181c2b'
    }
  },
  light: {
    primary: {
      from: '#f8fafc',
      via: '#e0f2fe',
      to: '#f0fdf4'
    },
    accent: {
      coral: '#fb7185',
      amber: '#f59e0b',
      blue: '#3b82f6',
      green: '#10b981'
    },
    background: {
      from: '#ffffff',
      via: '#f1f5f9',
      to: '#e2e8f0'
    }
  }
};

// Common animation presets
export const animations = {
  fadeInUp: {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power2.out'
  },
  
  fadeInLeft: {
    opacity: 0,
    x: -60,
    duration: 0.8,
    ease: 'power2.out'
  },
  
  fadeInRight: {
    opacity: 0,
    x: 60,
    duration: 0.8,
    ease: 'power2.out'
  },
  
  scaleIn: {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  },
  
  slideInUp: {
    y: 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  },
  
  stagger: {
    stagger: 0.1,
    ease: 'power2.out'
  }
};

// Text reveal animation
export const textReveal = (element: string | Element, options = {}) => {
  return gsap.fromTo(element, 
    { 
      opacity: 0, 
      y: 50,
      rotationX: 90 
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 1,
      ease: 'power2.out',
      ...options
    }
  );
};

// Character-by-character text animation
export const charReveal = (element: string | Element, options = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0,
      scale: 0,
      rotation: 180
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      ...options
    }
  );
};

// Floating animation
export const floating = (element: string | Element, options = {}) => {
  return gsap.to(element, {
    y: -10,
    duration: 2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    ...options
  });
};

// Parallax effect
export const parallax = (element: string | Element, speed = 0.5, options = {}) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      ...options
    }
  });
};

// 3D tilt effect
export const tilt3D = (element: string | Element, options = {}) => {
  const tilt = gsap.to(element, {
    rotationY: 15,
    rotationX: 5,
    duration: 0.3,
    ease: 'power2.out',
    ...options
  });
  
  return tilt;
};

// Glow pulse effect
export const glowPulse = (element: string | Element, options = {}) => {
  return gsap.to(element, {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    duration: 1.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    ...options
  });
};

// Scroll-triggered animations
export const scrollReveal = (element: string | Element, options = {}) => {
  return gsap.fromTo(element,
    { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options
      }
    }
  );
};

// Staggered grid animation
export const staggerGrid = (elements: string | Element[], options = {}) => {
  return gsap.fromTo(elements,
    { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements[0],
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        ...options
      }
    }
  );
};

// Cleanup function
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.killTweensOf('*');
};

// Initialize GSAP context
export const initGSAP = () => {
  // Set default ease
  gsap.defaults({ ease: 'power2.out' });
  
  // Add smooth scrolling
  gsap.set('html, body', { scrollBehavior: 'smooth' });
  
  return () => cleanupGSAP();
}; 