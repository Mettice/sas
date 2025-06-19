import React, { useState, createContext, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { AuthProvider } from './components/auth/AuthProvider';
import { TemplateGrid } from './components/templates/TemplateGrid';
import { ImagePlaceholder } from './components/ImagePlaceholder';
import { Chatbot } from './components/Chatbot';
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
  BarChart
} from 'lucide-react';
import AnimatedBeamDemo from './components/animated-beam-demo';
import { ContactForm } from './components/ContactForm';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function App() {
  const [isDark, setIsDark] = useState(true);

  // Add refs for scrolling
  const solutionsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const handleScrollToSolutions = () => {
    solutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToTestimonials = () => {
    testimonialsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToUseCases = () => {
    useCasesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleOpenScheduling = () => {
    window.open('https://calendly.com/your-scheduling-link', '_blank');
  };

  const toggleTheme = () => setIsDark(!isDark);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
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
      icon: "🏆"
    },
    { 
      title: "Industry Expertise", 
      description: "Deep understanding of business processes across hospitality, healthcare, e-commerce, and professional services sectors.",
      icon: "🎯"
    },
    { 
      title: "Custom Solutions", 
      description: "No one-size-fits-all approach. Every automation is tailored to your specific business needs and existing systems.",
      icon: "⚙️"
    },
    { 
      title: "Ongoing Support", 
      description: "We don't just build and leave. Continuous support, optimization, and maintenance to ensure your automations keep performing.",
      icon: "🤝"
    },
    { 
      title: "Cost-Effective", 
      description: "Our solutions typically pay for themselves within 3-6 months through time savings and increased productivity.",
      icon: "💰"
    },
    { 
      title: "Future-Proof Technology", 
      description: "Built with scalable, modern tools that grow with your business and integrate with your existing tech stack.",
      icon: "🚀"
    },
    { 
      title: "Quick Implementation", 
      description: "Most automations are live within 2-4 weeks, not months. Fast setup means faster results for your business.",
      icon: "⚡"
    },
    { 
      title: "Transparent Process", 
      description: "Clear communication throughout the project. You'll always know what we're building and how it works.",
      icon: "📋"
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

  const downloadSystem = {
    title: "Our Process",
    steps: [
      {
        title: "Discovery",
        description: "Understand your needs and goals",
        icon: "🎯"
      },
      {
        title: "Strategy",
        description: "Design optimal automation solution",
        icon: "⚡"
      },
      {
        title: "Implementation",
        description: "Deploy and optimize your solution",
        icon: "🚀"
      }
    ],
    enterpriseProcess: [
      {
        title: "Initial Assessment",
        description: "We'll analyze your current processes and identify automation opportunities"
      },
      {
        title: "Solution Design",
        description: "Our team will design a custom automation strategy"
      },
      {
        title: "Ongoing Support",
        description: "Get continuous support and optimization"
      }
    ]
  };

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
      description: "Streamline your data processing and analysis workflows",
      icon: <BarChart className="w-12 h-12 text-green-500" />,
      image: "/images/services/data.png",
      features: [
        "Data extraction and processing",
        "Automated reporting",
        "Data synchronization",
        "ETL workflows",
        "Real-time analytics"
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
    }
  ];

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
    { name: "Hotels & Hospitality", icon: "🏨" },
    { name: "Restaurants", icon: "🍽️" },
    { name: "Care Homes", icon: "🏥" },
    { name: "Real Estate", icon: "🏢" },
    { name: "Travel Agencies", icon: "✈️" },
    { name: "Professional Coaches", icon: "👥" },
    { name: "E-commerce", icon: "🛍️" },
    { name: "Healthcare", icon: "⚕️" },
    { name: "Education", icon: "📚" }
  ];

  const themeClasses = isDark 
    ? "min-h-screen bg-gradient-to-br from-[#0e0f11] via-[#181c2b] to-[#232946] text-white"
    : "min-h-screen bg-gradient-to-br from-white via-[#f0f4ff] to-[#e0e7ff] text-gray-900";

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <AuthProvider>
        <div className={`${themeClasses} font-['Space_Grotesk'] transition-colors duration-300`}>
          {/* Header with Theme Toggle */}
          <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-opacity-80 border-b ${
            isDark ? 'border-gray-800 bg-[#0e0f11]/80' : 'border-gray-200 bg-gray-50/80'
          }`}>
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="OpSyde Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">OpSyde</span>
              </div>
              
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                    : 'bg-white hover:bg-gray-100 text-gray-600 shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
          </header>

          {/* Hero Section with Animated Beam */}
          <motion.section 
            className="relative px-6 py-32 text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div className="max-w-6xl mx-auto" variants={fadeInUp}>
              <div className="w-24 h-24 mx-auto mb-8">
                <img 
                  src="/logo.png" 
                  alt="OpSyde Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <motion.h1 
                className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
                  isDark 
                    ? 'from-white to-gray-300' 
                    : 'from-gray-900 to-gray-600'
                } bg-clip-text text-transparent`}
                variants={fadeInUp}
              >
                Optimize Your Operations with Smart Automation
              </motion.h1>
              
              <motion.p 
                className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
                variants={fadeInUp}
              >
                OpSyde helps businesses optimize and scale their operations through intelligent automation. From lead generation to HR, email, and social media automation—unlock your team's full potential with our proven solutions.
              </motion.p>
              
              {/* Animated Beam Demo */}
              <motion.div 
                className="mb-12 max-w-4xl mx-auto"
                variants={fadeInUp}
              >
                <AnimatedBeamDemo isDark={isDark} />
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeInUp}
              >
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenScheduling}
                >
                  Book a Consultation
                </motion.button>
                <motion.button 
                  className={`px-8 py-4 border-2 rounded-lg font-semibold text-lg transition-all duration-300 text-cyan-600 border-cyan-400 bg-white hover:bg-cyan-50 hover:text-purple-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScrollToFeatures}
                >
                  View Features
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            ref={featuresRef}
            className={`px-6 py-20 ${
              isDark ? 'bg-gray-900/30' : 'bg-gray-100'
            }`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-center mb-6"
                variants={fadeInUp}
              >
                Why Choose OpSyde?
              </motion.h2>
              
              <motion.p 
                className={`text-xl text-center mb-16 max-w-3xl mx-auto ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
                variants={fadeInUp}
              >
                We combine industry expertise with cutting-edge automation to deliver measurable results
              </motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className={`p-8 rounded-xl ${isDark ? 'glass-dark border border-cyan-500/20' : 'glass border border-purple-400/20'} shadow-xl`}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                      <ImagePlaceholder 
                        type="service" 
                        index={index}
                        imageSrc={service.image}
                      />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                    <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Add Templates Section */}
          <motion.section
            className={`px-6 py-20 ${isDark ? 'bg-gray-900/30' : 'bg-white'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                variants={fadeInUp}
              >
                Free Automation Templates
              </motion.h2>
              
              <TemplateGrid />
            </div>
          </motion.section>

          {/* Testimonials Section */}
          <motion.section 
            ref={testimonialsRef}
            className={`px-6 py-20 ${isDark ? 'bg-gray-900/30' : 'bg-gray-100'}`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                variants={fadeInUp}
              >
                Case Studies
              </motion.h2>
              
              <div className="text-center text-gray-500 mb-8">See how we've helped clients automate and grow.</div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl ${isDark ? 'glass-dark border border-cyan-500/20 shadow-xl' : 'glass border border-purple-400/20 shadow-xl'}`}
                    variants={fadeInUp}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <ImagePlaceholder 
                          type="testimonial" 
                          index={index}
                          imageSrc={testimonial.image}
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {testimonial.role}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Industries Ticker */}
          <motion.section 
            className="px-6 py-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                variants={fadeInUp}
              >
                Industries We Serve
              </motion.h2>
              
              <motion.div 
                className="overflow-hidden"
                variants={fadeInUp}
              >
                <div className="flex animate-scroll">
                  {[...industries, ...industries].map((industry, index) => (
                    <div
                      key={index}
                      className={`flex-none mx-8 p-6 rounded-xl ${
                        isDark 
                          ? 'bg-gray-900/50 border border-gray-800' 
                          : 'bg-white border border-gray-200 shadow-lg'
                      }`}
                    >
                      <div className="text-4xl mb-3">{industry.icon}</div>
                      <h3 className="text-lg font-semibold">{industry.name}</h3>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Download System Section */}
          <motion.section 
            className={`px-6 py-20 ${
              isDark ? 'bg-gray-900/30' : 'bg-gray-100'
            }`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-4xl font-bold text-center mb-16"
                variants={fadeInUp}
              >
                {downloadSystem.title}
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {downloadSystem.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`p-6 rounded-xl text-center ${
                      isDark 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className={`px-6 py-20 ${
              isDark ? 'bg-gray-900/30' : 'bg-gray-100'
            }`}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                  className="text-center lg:text-left"
                  variants={fadeInUp}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Automate Your Workflow?
                  </h2>
                  
                  <p className={`text-xl mb-8 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Join thousands of professionals who've transformed their productivity with our automation templates.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <motion.button 
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl hover:from-cyan-500 hover:to-purple-500 transition-all duration-300 text-white flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleOpenScheduling}
                    >
                      <MessageSquare className="w-5 h-5" />
                      Schedule a Call
                    </motion.button>
                    
                    <motion.button 
                      className={`px-8 py-4 border-2 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 justify-center text-cyan-600 border-cyan-400 bg-white hover:bg-cyan-50 hover:text-purple-700 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-cyan-400`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleScrollToFeatures}
                    >
                      View Solutions
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className={`p-8 rounded-xl ${
                    isDark 
                      ? 'bg-gray-800/50 border border-gray-700' 
                      : 'bg-white border border-gray-200 shadow-lg'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          {/* Footer */}
          <footer className={`px-6 py-12 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-3 mb-4 md:mb-0">
                  <img 
                    src="/logo.png" 
                    alt="OpSyde Logo" 
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold">OpSyde</span>
                </div>
                <div className={`flex gap-8 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Templates</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
                </div>
              </div>
              <div className={`mt-8 pt-8 border-t text-center ${
                isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
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
  );
}

export default App;