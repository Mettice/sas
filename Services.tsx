import { motion } from 'motion/react';
import { Brain, Lightbulb, Rocket, Shield, BarChart3, Cpu } from 'lucide-react';
import { useState } from 'react';

const services = [
  {
    icon: Brain,
    title: 'AI Strategy & Consulting',
    description: 'Define your AI roadmap with expert guidance tailored to your business goals and industry challenges.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lightbulb,
    title: 'Custom AI Solutions',
    description: 'Build bespoke machine learning models and AI systems designed specifically for your unique needs.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'AI Implementation',
    description: 'Seamlessly integrate AI technologies into your existing infrastructure with minimal disruption.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics & Insights',
    description: 'Transform raw data into actionable intelligence with advanced analytics and visualization.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'AI Ethics & Compliance',
    description: 'Ensure responsible AI deployment with ethical frameworks and regulatory compliance.',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Cpu,
    title: 'MLOps & Automation',
    description: 'Streamline model deployment and monitoring with enterprise-grade MLOps infrastructure.',
    gradient: 'from-teal-500 to-cyan-500',
  },
];

export function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Our Expertise
          </motion.div>
          <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6">
            Comprehensive AI Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            End-to-end solutions that empower your organization to harness
            the transformative power of artificial intelligence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ y: -8 }}
            >
              {/* Background Gradient (on hover) */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              {/* Icon */}
              <motion.div
                className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}
                animate={hoveredIndex === index ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <service.icon size={32} className="text-white" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>

              {/* Arrow indicator */}
              <motion.div
                className="mt-6 text-blue-600 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                animate={hoveredIndex === index ? { x: 0 } : { x: -10 }}
              >
                <span>Learn more</span>
                <motion.span
                  animate={hoveredIndex === index ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
