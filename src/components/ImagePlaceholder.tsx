import React from 'react';
import { Placeholder } from './Placeholder';

interface ImagePlaceholderProps {
  type: 'testimonial' | 'service';
  index: number;
  className?: string;
  imageSrc?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ 
  type, 
  index, 
  className = '',
  imageSrc 
}) => {
  const dimensions = type === 'testimonial' 
    ? 'w-16 h-16' // Square for testimonials
    : 'w-full aspect-video'; // 16:9 for services

  const gradients = {
    testimonial: [
      'from-blue-500/10 to-blue-500/5',
      'from-amber-500/10 to-amber-500/5',
      'from-emerald-500/10 to-emerald-500/5'
    ],
    service: [
      'from-purple-500/10 to-purple-500/5',
      'from-cyan-500/10 to-cyan-500/5',
      'from-green-500/10 to-green-500/5'
    ]
  };

  const icons = {
    testimonial: ['👩‍💼', '👨‍🍳', '👩‍⚕️'],
    service: ['⚙️', '🤖', '📊']
  };

  if (imageSrc) {
    return (
      <div className={`${dimensions} ${className} overflow-hidden rounded-lg`}>
        <img 
          src={imageSrc}
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.add('placeholder-fallback');
          }}
        />
        <div className="hidden placeholder-fallback">
          <Placeholder
            text=""
            icon={icons[type][index]}
            bgClass={`bg-gradient-to-br ${gradients[type][index]}`}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${dimensions} ${className}`}>
      <Placeholder
        text=""
        icon={icons[type][index]}
        bgClass={`bg-gradient-to-br ${gradients[type][index]}`}
        className="w-full h-full"
      />
    </div>
  );
}; 