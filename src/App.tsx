import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthProvider } from './components/auth/AuthProvider';
import { TemplateGrid } from './components/templates/TemplateGrid';
import { ImagePlaceholder } from './components/ImagePlaceholder';
import { Chatbot } from './components/Chatbot';
import { HeroSection } from './components/HeroSection';
import { ServiceCards } from './components/ServiceCards';
import { 
  Bot, 
  MessageSquare, 
  Database, 
  TrendingUp, 
  Zap, 
  Shield, 
  Download, 
  Star,
  Check,
  ArrowRight,
  Sun,
  Moon,
  Workflow,
  Brain,
  BarChart,
  Building2,
  Utensils,
  Heart,
  Building,
  Plane,
  Users,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Target,
  Rocket,
  Trophy,
  Crosshair,
  Settings,
  Handshake,
  DollarSign,
  Sparkles,
  Clock,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Search,
  Lightbulb,
  Code,
  Wrench,
  Play,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import AnimatedBeamDemo from './components/animated-beam-demo';
import { ContactForm } from './components/ContactForm';
import { initGSAP, enhancedColors } from './utils/gsap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TemplatesPage from './components/templates/TemplatesPage';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Add refs for scrolling
  const solutionsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Initialize GSAP
  useEffect(() => {
    const cleanup = initGSAP();
    return cleanup;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleOpenScheduling = () => {
    handleScrollToContact();
  };

  const navigateToTemplates = () => {
    // This would navigate to a separate templates page
    window.location.href = '/templates';
  };

  const navigateToAbout = () => {
    // This would navigate to a separate about page
    window.location.href = '/about';
  };

  const navigateToTeam = () => {
    // This would navigate to a separate team page
    window.location.href = '/team';
  };

  const toggleTheme = () => setIsDark(!isDark);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const useCases = [
    { icon: Bot, title: "AI Automation", description: "Custom AI-powered workflow automation" },
    { icon: MessageSquare, title: "Integration Solutions", description: "Seamless platform integrations" },
    { icon: Database, title: "Data Automation", description: "Intelligent data processing & sync" },
    { icon: TrendingUp, title: "Business Process Automation", description: "End-to-end process optimization" },
    { icon: Zap, title: "Custom Development", description: "Tailored automation solutions" },
    { icon: Shield, title: "Security & Compliance", description: "Secure automation implementation" }
  ];

  const whyChooseUs = [
    { 
      title: "Proven Track Record", 
      description: "We've successfully automated workflows for 100+ businesses across various industries, delivering measurable ROI and efficiency gains.",
      icon: <Trophy className="w-8 h-8 text-purple-500" />
    },
    { 
      title: "Industry Expertise", 
      description: "Deep understanding of business processes across hospitality, healthcare, e-commerce, and professional services sectors.",
      icon: <Crosshair className="w-8 h-8 text-cyan-500" />
    },
    { 
      title: "Custom Solutions", 
      description: "No one-size-fits-all approach. Every automation is tailored to your specific business needs and existing systems.",
      icon: <Settings className="w-8 h-8 text-purple-500" 
      />
    },
    { 
      title: "Ongoing Support", 
      description: "We don't just build and leave. Continuous support, optimization, and maintenance to ensure your automations keep performing.",
      icon: <Handshake className="w-8 h-8 text-cyan-500" />
    },
    { 
      title: "Cost-Effective", 
      description: "Our solutions typically pay for themselves within 3-6 months through time savings and increased productivity.",
      icon: <DollarSign className="w-8 h-8 text-purple-500" />
    },
    { 
      title: "Future-Proof Technology", 
      description: "Built with scalable, modern tools that grow with your business and integrate with your existing tech stack.",
      icon: <Rocket className="w-8 h-8 text-cyan-500" />
    },
    { 
      title: "Quick Implementation", 
      description: "Most automations are live within 2-4 weeks, not months. Fast setup means faster results for your business.",
      icon: <Clock className="w-8 h-8 text-purple-500" />
    },
    { 
      title: "Transparent Process", 
      description: "Clear communication throughout the project. You'll always know what we're building and how it works.",
      icon: <FileText className="w-8 h-8 text-cyan-500" />
    }
  ];

  const pricingTiers = [
    {
      name: "Discovery Call",
      price: "Free",
      description: "Initial consultation",
      features: [
        "30-minute strategy session",
        "Process assessment",
        "Automation recommendations",
        "Implementation roadmap",
        "Cost estimation",
        "Next steps planning"
      ],
      highlight: "Perfect for exploring automation",
      delivery: "Virtual meeting"
    },
    {
      name: "Implementation",
      price: "Custom",
      description: "Full automation solution",
      features: [
        "Custom workflow development",
        "Platform integration",
        "Testing & deployment",
        "Documentation",
        "Team training",
        "30-day support",
        "Monthly maintenance",
        "Performance monitoring"
      ],
      highlight: "Value: Optimized workflows",
      delivery: "Phased implementation"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Large-scale automation",
      features: [
        "Custom enterprise solutions",
        "Multi-platform integration",
        "Advanced security features",
        "API development",
        "Dedicated support team",
        "Quarterly reviews",
        "Strategic planning",
        "Custom reporting",
        "SLA guarantees"
      ],
      highlight: "Potential: Enterprise-wide optimization",
      delivery: "Enterprise deployment"
    }
  ];

  const processSteps = [
    {
      title: "Discovery",
      description: "We begin by understanding your business objectives, challenges, and data landscape to identify automation opportunities.",
      icon: <Search className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Strategy",
      description: "Our team develops a comprehensive automation roadmap aligned with your business goals and technical requirements.",
      icon: <Lightbulb className="w-8 h-8 text-cyan-500" />
    },
    {
      title: "Development",
      description: "We build, configure, and fine-tune automation workflows using state-of-the-art tools and your specific requirements.",
      icon: <Code className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Integration",
      description: "Our engineers seamlessly integrate automation solutions into your existing systems and workflows.",
      icon: <Wrench className="w-8 h-8 text-cyan-500" />
    },
    {
      title: "Deployment",
      description: "We ensure smooth deployment with comprehensive testing and monitoring systems in place.",
      icon: <Play className="w-8 h-8 text-purple-500" />
    },
    {
      title: "Optimization",
      description: "Continuous improvement through performance monitoring, refinement, and feature enhancement.",
      icon: <TrendingUpIcon className="w-8 h-8 text-cyan-500" />
    }
  ];

  const services = [
    {
      title: "Custom Workflow Development",
      description: "Tailored automation solutions designed specifically for your business needs",
      icon: <Workflow className="w-12 h-12 text-purple-500" />,
      image: "/images/services/workflow.png",
      features: [
        "Process analysis and optimization",
        "Custom workflow design",
        "Integration with existing systems",
        "Testing and deployment",
        "Documentation and training"
      ]
    },
    {
      title: "AI Integration Services",
      description: "Leverage the power of AI to enhance your business processes",
      icon: <Brain className="w-12 h-12 text-cyan-500" />,
      image: "/images/services/ai.png",
      features: [
        "AI model integration",
        "Natural language processing",
        "Predictive analytics",
        "Machine learning pipelines",
        "Automated decision making"
      ]
    },
    {
      title: "Data Automation",
      description: "Streamline, visualize your data processing, performance, with real-time dashboards and analytics.",
      icon: <BarChart className="w-12 h-12 text-green-500" />,
      image: "/images/services/data.png",
      features: [
        "Data extraction and processing",
        "ETL workflows",
        "Real-time reporting", 
        "Integrates with BI tools",
        "And many more"

      ]
    },
    {
      title: "Lead Generation Automation",
      description: "Automate the discovery, enrichment, and nurturing of leads to accelerate your sales pipeline.",
      icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
      image: "/images/services/leadgen.png",
      features: [
        "Automated lead capture",
        "CRM integration",
        "Lead scoring and enrichment",
        "Personalized outreach",
        "Real-time notifications"
      ]
    },
    {
      title: "Marketing Campaign Automation",
      description: "Launch, manage, and track multi-channel marketing campaigns with ease and precision.",
      icon: <Zap className="w-12 h-12 text-pink-500" />,
      image: "/images/services/marketing.png",
      features: [
        "Multi-channel campaign automation",
        "Email, SMS, and social media integration",
        "Personalized content delivery",
        "Performance analytics",
        "A/B testing and optimization"
      ]
    },
    {
      title: "Customer Onboarding Automation",
      description: "Deliver a seamless onboarding experience for new clients with automated workflows and personalized communication.",
      icon: <MessageSquare className="w-12 h-12 text-orange-500" />,
      image: "/images/services/onboarding.png",
      features: [
        "Automated welcome emails",
        "Document collection and verification",
        "Onboarding checklist automation",
        "Training session scheduling",
        "Progress tracking and reminders"
      ]
    },
    {
      title: "Conversational Chatbots",
      description: "Deploy AI-powered chatbots to engage customers, answer questions, and automate support 24/7.",
      icon: <MessageSquare className="w-12 h-12 text-cyan-500" />,
      image: "/images/services/chatbot.png",
      features: [
        "24/7 customer support",
        "Lead qualification",
        "Appointment scheduling",
        "FAQ automation",
        "Seamless handoff to human agents"
      ]
    },
    {
      title: "AI Caller & Receptionist",
      description: "Automate inbound and outbound calls, appointment reminders, and customer reception with AI voice technology.",
      icon: <Bot className="w-12 h-12 text-purple-500" />,
      image: "/images/services/aicaller.png",
      features: [
        "Automated call answering",
        "Appointment reminders",
        "Voice-based lead capture",
        "Natural language conversations",
        "CRM integration"
      ]
    },
    {
      title: "CRM Integration",
      description: "Seamlessly connect your business tools and automate workflows with powerful CRM integrations.",
      icon: <Database className="w-12 h-12 text-cyan-500" />,
      image: "/images/services/crm.png",
      features: [
        "Sync contacts and leads",
        "Automated data entry",
        "Two-way integration",
        "Custom triggers and actions",
        "Works with Salesforce, HubSpot, Zoho, and more"
      ]
    }
  ];

  // Remove the separate 'Dashboards & Analytics' card
  const dashboardsIndex = services.findIndex(s => s.title === 'Dashboards & Analytics');
  if (dashboardsIndex !== -1) services.splice(dashboardsIndex, 1);

  const testimonials = [
    {
      name: "Rawlings Matez",
      role: "Operations Manager",
      company: "Luxury Hotels Group",
      content: "The automation solutions provided have transformed our guest service operations. We've seen a 40% increase in efficiency.",
      image: "/images/testimonials/hotel.png"
    },
    {
      name: "Maria Kibwana",
      role: "Restaurant Owner",
      company: "Fine Dining Co",
      content: "Their automation tools have streamlined our reservation and inventory management. Exceptional service!",
      image: "/images/testimonials/restaurant.png"
    },
    {
      name: "Jeremy Achieng",
      role: "Care Home Director",
      company: "Sunshine Care Homes",
      content: "The automated scheduling and care management systems have improved our staff efficiency and resident care quality.",
      image: "/images/testimonials/care.png"
    }
  ];

  const industries = [
    { name: "Hotels & Hospitality", icon: <Building2 className="w-8 h-8 text-blue-500" /> },
    { name: "Restaurants", icon: <Utensils className="w-8 h-8 text-blue-500" /> },
    { name: "Care Homes", icon: <Heart className="w-8 h-8 text-blue-500" /> },
    { name: "Real Estate", icon: <Building className="w-8 h-8 text-blue-500" /> },
    { name: "Travel Agencies", icon: <Plane className="w-8 h-8 text-blue-500" /> },
    { name: "Professional Coaches", icon: <Users className="w-8 h-8 text-blue-500" /> },
    { name: "E-commerce", icon: <ShoppingCart className="w-8 h-8 text-blue-500" /> },
    { name: "Healthcare", icon: <Stethoscope className="w-8 h-8 text-blue-500" /> },
    { name: "Education", icon: <GraduationCap className="w-8 h-8 text-blue-500" /> }
  ];

  const themeClasses = isDark 
    ? `min-h-screen bg-black text-white relative`
    : `min-h-screen bg-[#f7fafd] text-gray-900 relative`;

  return (
    <Router>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <AuthProvider>
          <div className={`${themeClasses} font-['Space_Grotesk'] transition-colors duration-300 relative`}>
            {/* Animated Gradient/Vignette Overlay for Dark Theme - absolute and only in dark mode */}
            {isDark && (
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-black opacity-80 animate-gradient-x" style={{mixBlendMode: 'screen'}}></div>
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" style={{mixBlendMode: 'multiply'}}></div>
              </div>
            )}

            {/* Header with Theme Toggle */}
            <header className={`sticky top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-300 backdrop-blur-md border-b ${
              isDark
                ? `${scrolled ? 'bg-zinc-900/95 shadow-2xl border-purple-500/20' : 'bg-zinc-900/80 border-white/10'}`
                : `${scrolled ? 'bg-white/95 shadow-2xl border-purple-400/30' : 'bg-gray-50/80 border-gray-200'}`
            }`}>
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2 sm:gap-3 transition-all duration-300">
                  <img 
                    src="/logo.png" 
                    alt="OpSyde Logo" 
                    className={`transition-all duration-300 ${scrolled ? 'w-5 h-5 sm:w-7 sm:h-7' : 'w-6 h-6 sm:w-8 sm:h-8'}`}
                  />
                  <span className={`text-lg sm:text-xl font-bold transition-all duration-300 ${scrolled ? 'scale-95' : ''}`}>OpSyde</span>
                </div>
                {/* Navbar Links */}
                <nav className="hidden md:flex gap-6 text-base font-medium items-center">
                  <Link to="/" className="transition-colors duration-200 hover:text-purple-400 focus:text-purple-400">Home</Link>
                  <a href="#features" onClick={(e) => { e.preventDefault(); handleScrollToFeatures(); }} className="transition-colors duration-200 hover:text-purple-400 focus:text-purple-400">Solutions</a>
                  <a href="#process" onClick={(e) => { e.preventDefault(); handleScrollToProcess(); }} className="transition-colors duration-200 hover:text-purple-400 focus:text-purple-400">Process</a>
                  <a href="#testimonials" onClick={(e) => { e.preventDefault(); handleScrollToTestimonials(); }} className="transition-colors duration-200 hover:text-purple-400 focus:text-purple-400">Case Studies</a>
                  <Link to="/templates" className="transition-colors duration-200 hover:text-purple-400 focus:text-purple-400">Templates</Link>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); handleScrollToContact(); }} className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white font-semibold shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400">Book a Call</a>
                </nav>
              </div>
            </header>

            <Routes>
              <Route path="/" element={
                <>
                  {/* Enhanced Hero Section */}
                  <HeroSection 
                    isDark={isDark}
                    onOpenScheduling={handleOpenScheduling}
                    onScrollToFeatures={handleScrollToFeatures}
                  />
                  {/* Section Divider */}
                  {isDark && (
                    <div aria-hidden="true" className="-mt-4 -mb-4">
                      <div className="w-full h-px bg-gray-800"></div>
                    </div>
                  )}

                  {/* Features Section */}
                  <motion.section 
                    ref={featuresRef}
                    className={`px-4 sm:px-6 py-16 sm:py-20 mt-12 sm:mt-16 ${
                      isDark ? 'bg-zinc-900/30' : 'bg-gray-100'
                    }`}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <motion.h2 
                        className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6"
                        variants={fadeInUp}
                      >
                        What We Deliver?
                      </motion.h2>
                      
                      <motion.p 
                        className={`text-lg sm:text-xl text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4 ${
                          isDark ? 'text-zinc-300' : 'text-gray-600'
                        }`}
                        variants={fadeInUp}
                      >
                        We combine industry expertise with cutting-edge automation to deliver measurable results
                      </motion.p>

                      <ServiceCards isDark={isDark} services={services} />
                    </div>
                  </motion.section>
                  {/* Section Divider */}
                  {isDark && (
                    <div aria-hidden="true" className="-mt-4 -mb-4">
                      <div className="w-full h-px bg-gray-800"></div>
                    </div>
                  )}

                  {/* Why Choose Us Section */}
                  <motion.section 
                    className="px-4 sm:px-6 py-16 sm:py-20 bg-zinc-900/30"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <motion.h2 
                        className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-6"
                        variants={fadeInUp}
                      >
                        Why Choose Us
                      </motion.h2>
                      <motion.p 
                        className="text-lg sm:text-xl text-center mb-12 sm:mb-16 max-w-3xl mx-auto px-4 text-zinc-300"
                        variants={fadeInUp}
                      >
                        We combine industry expertise with cutting-edge automation to deliver measurable results
                      </motion.p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-zinc-800/50 border border-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:bg-zinc-800/80 transition-colors"
                            variants={fadeInUp}
                          >
                            <span className="mb-4">{item.icon}</span>
                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-zinc-300 text-base">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                  {/* Section Divider */}
                  {isDark && (
                    <div aria-hidden="true" className="-mt-4 -mb-4">
                      <div className="w-full h-px bg-gray-800"></div>
                    </div>
                  )}

                  {/* Testimonials Section */}
                  <motion.section 
                    ref={testimonialsRef}
                    className={`px-4 sm:px-6 py-16 sm:py-20 ${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'}`}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <motion.h2 
                        className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
                        variants={fadeInUp}
                      >
                        Case Studies
                      </motion.h2>
                      
                      <div className="text-center text-zinc-400 mb-8 text-sm sm:text-base">See how we've helped clients automate and grow.</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {testimonials.map((testimonial, index) => (
                          <motion.div
                            key={index}
                            className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 ${
                              isDark 
                                ? 'bg-zinc-800/50 border-white/10 hover:border-purple-500' 
                                : 'bg-white border-gray-200 hover:border-purple-500 shadow-sm'
                            }`}
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                          >
                            {/* Testimonial Icon */}
                            <div className="mb-6 flex justify-center">
                              <div className={`w-16 h-16 flex items-center justify-center rounded-full border-2 overflow-hidden ${
                                isDark
                                  ? 'bg-zinc-700 border-white/10'
                                  : 'bg-gray-100 border-gray-300'
                              }`}>
                                <ImagePlaceholder 
                                  type="testimonial" 
                                  index={index}
                                  imageSrc={testimonial.image}
                                  className="w-full h-full rounded-full"
                                />
                              </div>
                            </div>
                            
                            <div className="text-center mb-6">
                              <h4 className="text-xl font-bold mb-2 text-white">{testimonial.name}</h4>
                              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {testimonial.role}
                              </p>
                              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>
                                {testimonial.company}
                              </p>
                            </div>
                            
                            <p className={`italic text-base text-center ${isDark ? 'text-zinc-300' : 'text-gray-600'}`}>
                              "{testimonial.content}"
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.section>
                  {/* Section Divider */}
                  {isDark && (
                    <div aria-hidden="true" className="-mt-4 -mb-4">
                      <div className="w-full h-px bg-gray-800"></div>
                    </div>
                  )}

                  {/* Process Section */}
                  <motion.section 
                    ref={processRef}
                    className={`px-4 sm:px-6 py-16 sm:py-20 ${
                      isDark ? 'bg-zinc-900/50' : 'bg-gray-50'
                    }`}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <motion.h2 
                        className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
                        variants={fadeInUp}
                      >
                        Our Process
                      </motion.h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {processSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            className={`p-6 sm:p-8 rounded-xl border transition-all duration-300 ${
                              isDark 
                                ? 'bg-zinc-800/50 border-white/10 hover:border-purple-500' 
                                : 'bg-white border-gray-200 hover:border-purple-500 shadow-sm'
                            }`}
                            variants={fadeInUp}
                            whileHover={{ y: -2 }}
                          >
                            {/* Step Icon */}
                            <div className="flex items-center justify-between mb-6">
                              <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                                isDark
                                  ? 'bg-zinc-700 border-white/10'
                                  : 'bg-gray-100 border-gray-300'
                              }`}>
                                {step.icon}
                              </div>
                            </div>
                            
                            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">{step.title}</h3>
                            <p className={`text-base ${isDark ? 'text-zinc-400' : 'text-gray-600'}`}>{step.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.section>

                  {/* Industries Section */}
                  <motion.section 
                    className="px-4 sm:px-6 py-16 sm:py-20 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <motion.h2 
                        className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16"
                        variants={fadeInUp}
                      >
                        Industries We Serve
                      </motion.h2>
                      
                      <div className="relative w-full overflow-hidden">
                        <div className="flex gap-4 sm:gap-6 animate-scroll" style={{ width: 'max-content' }}>
                          {industries.map((industry, index) => (
                            <motion.div
                              key={index}
                              className={`flex-shrink-0 w-64 p-6 rounded-xl border transition-all duration-300 text-center shadow-sm hover:shadow-md ${
                                isDark 
                                  ? 'bg-zinc-800/50 border-white/10 hover:border-purple-500' 
                                  : 'bg-white border-gray-200 hover:border-purple-500'
                              }`}
                              whileHover={{ y: -2 }}
                            >
                              {/* Industry Icon */}
                              <div className="mb-4 flex justify-center">
                                <div className={`w-12 h-12 flex items-center justify-center rounded-lg border ${
                                  isDark
                                    ? 'bg-zinc-800 border-white/10'
                                    : 'bg-gray-100 border-gray-300'
                                }`}>
                                  {industry.icon}
                                </div>
                              </div>
                              
                              <h3 className="text-base font-semibold text-white">{industry.name}</h3>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  {/* CTA Section */}
                  <motion.section 
                    ref={contactRef}
                    className={`px-4 sm:px-6 py-16 sm:py-20 ${
                      isDark ? 'bg-zinc-900/50' : 'bg-gray-50'
                    }`}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                  >
                    <div className="max-w-6xl mx-auto">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <motion.div 
                          className="text-center lg:text-left"
                          variants={fadeInUp}
                        >
                          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                            Ready to Automate Your Workflow?
                          </h2>
                          
                          <p className={`text-lg sm:text-xl mb-6 sm:mb-8 ${
                            isDark ? 'text-zinc-300' : 'text-gray-600'
                          }`}>
                            Join thousands of professionals who've transformed their productivity with our automation templates.
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <motion.button 
                              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 text-white flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleOpenScheduling}
                            >
                              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                              Schedule a Call
                            </motion.button>
                            
                            <motion.button 
                              className={`px-6 sm:px-8 py-3 sm:py-4 border-2 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 flex items-center gap-2 justify-center text-purple-400 border-purple-400 bg-transparent hover:bg-purple-400/10 hover:text-purple-300 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={navigateToTemplates}
                            >
                              View Templates
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </motion.button>
                          </div>
                        </motion.div>

                        <motion.div
                          variants={fadeInUp}
                          className={`p-6 sm:p-8 rounded-xl border ${
                            isDark 
                              ? 'bg-zinc-800/50 border-white/10' 
                              : 'bg-white border-gray-200 shadow-sm'
                          }`}
                        >
                          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Get in Touch</h3>
                          <ContactForm />
                        </motion.div>
                      </div>
                    </div>
                  </motion.section>
                </>
              } />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
            
            {/* Footer */}
            <footer className={`px-4 sm:px-6 py-8 sm:py-12 border-t ${
              isDark ? 'border-white/10 bg-zinc-900/50' : 'border-gray-200'
            }`}>
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <img 
                      src="/logo.png" 
                      alt="OpSyde Logo" 
                      className="w-6 h-6 sm:w-8 sm:h-8"
                    />
                    <span className="text-lg sm:text-xl font-bold text-white">OpSyde</span>
                  </div>
                  <div className={`flex gap-6 sm:gap-8 text-sm sm:text-base ${
                    isDark ? 'text-zinc-400' : 'text-gray-600'
                  }`}>
                    <a href="#" className="hover:text-purple-400 transition-colors">Templates</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
                    <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
                  </div>
                </div>
                <div className={`mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-sm sm:text-base ${
                  isDark ? 'border-white/10 text-zinc-400' : 'border-gray-200 text-gray-600'
                }`}>
                  <p>&copy; 2024 OpSyde. All rights reserved.</p>
                </div>
              </div>
            </footer>

            {/* Add Chatbot before the closing div */}
            <Chatbot />
          </div>
        </AuthProvider>
      </ThemeContext.Provider>
    </Router>
  );
}

export default App;