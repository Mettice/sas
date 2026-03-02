import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ProcessSection } from './components/ProcessSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { Chatbot } from './components/Chatbot';
import TemplatesPage from './components/templates/TemplatesPage';
import { AuthProvider } from './components/auth/AuthProvider';

type HeroTheme = 'dark' | 'light';

function HomePage({ heroTheme }: { heroTheme: HeroTheme }) {
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCaseStudies = () => {
    caseStudiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Hero */}
      <HeroSection
        onScrollToContact={scrollToContact}
        onScrollToCaseStudies={scrollToCaseStudies}
        theme={heroTheme}
      />

      {/* Services */}
      <ServicesSection />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Case Studies */}
      <div ref={caseStudiesRef}>
        <CaseStudiesSection />
      </div>

      {/* Process */}
      <ProcessSection />

      {/* Capabilities */}
      <CapabilitiesSection />

      {/* Contact */}
      <div ref={contactRef}>
        <ContactSection />
      </div>
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [heroTheme, setHeroTheme] = useState<HeroTheme>('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Navigation
          scrolled={scrolled}
          theme={heroTheme}
          onToggleTheme={() =>
            setHeroTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
          }
        />
        <Routes>
          <Route path="/" element={<HomePage heroTheme={heroTheme} />} />
          <Route
            path="/templates"
            element={<TemplatesPage isDark={false} scrolled={scrolled} />}
          />
        </Routes>
        <FooterSection />
        <Chatbot />
      </AuthProvider>
    </Router>
  );
}

export default App;