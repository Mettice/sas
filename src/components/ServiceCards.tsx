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
    <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${isDark ? '' : 'bg-[#f7fafd]'}`}>
      {services.map((service, index) => (
        <motion.div
          key={index}
          ref={(el) => { cards.current[index] = el; }}
          className={`p-6 sm:p-8 rounded-xl transform transition-all duration-300 ${
            isDark 
              ? 'glass-dark border border-cyan-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50' 
              : 'bg-white border border-gray-200 shadow-md'
          } card-hover relative`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Service Image */}
          <div className="aspect-video mb-4 sm:mb-6 overflow-hidden rounded-lg relative group">
            <ImagePlaceholder 
              type="service" 
              index={index}
              imageSrc={service.image}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isDark 
                ? 'from-gray-900/50 to-transparent' 
                : 'from-white/50 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>

          {/* Service Icon */}
          <div className="service-icon mb-4 sm:mb-6 flex justify-center">
            <div className={`p-3 rounded-xl ${
              isDark 
                ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30' 
                : 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30'
            }`}>
              {service.icon}
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-center">
            {service.title}
          </h3>

          {/* Service Description */}
          <p className={`mb-4 sm:mb-6 text-sm sm:text-base text-center ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {service.description}
          </p>

          {/* Features List */}
          <ul className="space-y-2 sm:space-y-3">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="feature-item flex items-start gap-3">
                <div className={`p-1 rounded-full ${
                  isDark 
                    ? 'bg-cyan-500/20 text-cyan-400' 
                    : 'bg-purple-500/20 text-purple-600'
                }`}>
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                </div>
                <span className={`text-sm sm:text-base ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark 
              ? 'bg-gradient-to-br from-cyan-500/5 to-purple-500/5' 
              : 'bg-gradient-to-br from-purple-500/5 to-cyan-500/5'
          }`}></div>
        </motion.div>
      ))}
    </div>
  );
}; 