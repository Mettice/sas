import React from 'react';

interface PlaceholderProps {
  text: string;
  className?: string;
  bgClass?: string;
  icon?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ 
  text, 
  className = "w-full h-full", 
  bgClass = "bg-gradient-to-br from-purple-500/20 to-cyan-500/20",
  icon
}) => {
  return (
    <div className={`${className} ${bgClass} flex flex-col items-center justify-center rounded-lg overflow-hidden`}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <p className="text-lg font-medium text-center px-4">{text}</p>
    </div>
  );
}; 