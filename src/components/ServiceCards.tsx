import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { staggerGrid, tilt3D, glowPulse, enhancedColors } from '../utils/gsap';
import { 
  Workflow, 
  Brain, 
  BarChart, 
  TrendingUp, 
  Zap, 
  MessageSquare,
  Check
} from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  features: string[];
}

interface ServiceCardsProps {
  isDark: boolean;
  services: Service[];
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ isDark, services }) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!cardsRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered grid animation
      const validCards = cards.current.filter((card): card is HTMLDivElement => card !== null);
      staggerGrid(validCards, {
        stagger: 0.15,
        start: 'top 85%'
      });

      // Add hover effects to each card
      cards.current.forEach((card, index) => {
        if (!card) return;

        // 3D tilt effect on hover
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotationY: 5,
            rotationX: 2,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Add glow effect
          gsap.to(card, {
            boxShadow: isDark 
              ? '0 20px 40px rgba(14, 165, 233, 0.2)' 
              : '0 20px 40px rgba(139, 92, 246, 0.2)',
            duration: 0.3
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Remove glow effect
          gsap.to(card, {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            duration: 0.3
          });
        });

        // Animate feature list items
        const featureItems = card.querySelectorAll('.feature-item');
        gsap.fromTo(featureItems,
          { 
            opacity: 0, 
            x: -20 
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Animate icons
        const icon = card.querySelector('.service-icon');
        if (icon) {
          gsap.fromTo(icon,
            { 
              scale: 0, 
              rotation: 180 
            },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

    }, cardsRef);

    return () => ctx.revert();
  }, [isDark, services]);

  const colors = enhancedColors[isDark ? 'dark' : 'light'];

  return (
    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          ref={(el) => { cards.current[index] = el; }}
          className="bg-zinc-800/50 border border-yellow-500/20 p-8 rounded-xl hover:bg-zinc-800/80 hover:border-yellow-500/40 transition-colors flex flex-col items-center text-center relative"
        >
          {/* Service Icon */}
          <div className="mb-6 flex justify-center">
            <span className="text-5xl text-yellow-500 service-icon">{service.icon}</span>
          </div>
          {/* Service Title */}
          <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
          {/* Service Description */}
          <p className="mb-6 text-zinc-300 text-base">{service.description}</p>
          {/* Features List */}
          <ul className="space-y-2 mb-2">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2 justify-center text-zinc-300 text-sm feature-item">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-yellow-600/20 text-yellow-400"><Check className="w-4 h-4" /></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}; 