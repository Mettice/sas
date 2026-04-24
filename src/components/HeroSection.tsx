import React from 'react';
import { NexusHero } from './hero/NexusHero';

type HeroTheme = 'dark' | 'light';

interface HeroSectionProps {
  onScrollToContact: () => void;
  onScrollToCaseStudies: () => void;
  theme?: HeroTheme;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToContact,
  onScrollToCaseStudies,
}) => {
  return (
    <NexusHero
      onScrollToContact={onScrollToContact}
      onScrollToCaseStudies={onScrollToCaseStudies}
    />
  );
};
