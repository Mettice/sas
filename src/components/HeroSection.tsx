import React from 'react';
import { OpsydeMynaHero } from './OpsydeMynaHero';

type HeroTheme = 'dark' | 'light';

interface HeroSectionProps {
  onScrollToContact: () => void;
  onScrollToCaseStudies: () => void;
  theme: HeroTheme;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToContact,
  onScrollToCaseStudies,
  theme,
}) => {
  return (
    <OpsydeMynaHero
      onScrollToContact={onScrollToContact}
      onScrollToCaseStudies={onScrollToCaseStudies}
      theme={theme}
    />
  );
};