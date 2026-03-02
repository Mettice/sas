import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const caseStudies = [
  {
    company: 'FinTech Global',
    industry: 'Financial Services',
    title: 'AI-Powered Fraud Detection',
    description: 'Implemented a real-time fraud detection system that reduced fraudulent transactions by 87% while improving customer experience.',
    metrics: [
      { label: 'Fraud Reduction', value: '87%' },
      { label: 'Processing Speed', value: '3x faster' },
      { label: 'Cost Savings', value: '$12M annually' },
    ],
    image: 'https://images.unsplash.com/photo-1762279388979-6a430989284c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMG5ldHdvcmt8ZW58MXx8fHwxNzY0MzEzOTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    company: 'RetailMax',
    industry: 'Retail & E-commerce',
    title: 'Predictive Inventory Management',
    description: 'Developed an AI solution that optimizes inventory levels across 200+ stores, reducing waste and stockouts.',
    metrics: [
      { label: 'Waste Reduction', value: '45%' },
      { label: 'Stock Accuracy', value: '96%' },
      { label: 'Revenue Growth', value: '23%' },
    ],
    image: 'https://images.unsplash.com/photo-1760611656007-f767a8082758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBtZWV0aW5nfGVufDF8fHx8MTc2NDM5ODM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    company: 'HealthCare Plus',
    industry: 'Healthcare',
    title: 'Diagnostic AI Assistant',
    description: 'Created an AI-powered diagnostic tool that assists physicians in early disease detection with exceptional accuracy.',
    metrics: [
      { label: 'Accuracy Rate', value: '94%' },
      { label: 'Time Saved', value: '40%' },
      { label: 'Early Detection', value: '+62%' },
    ],
    image: 'https://images.unsplash.com/photo-1640552421163-5a8e34827550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY2lyY3VpdCUyMGJvYXJkfGVufDF8fHx8MTc2NDM1MDk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    gradient: 'from-green-600 to-emerald-600',
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-32 bg-white">
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
            className="inline-flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <TrendingUp size={16} />
            <span>Proven Results</span>
          </motion.div>
          <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-world impact across industries. See how we've helped leading organizations
            achieve transformative results with AI.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <motion.div
                  className="relative h-96 lg:h-auto overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Industry Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700">
                    {study.industry}
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className="p-12 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h3 className="text-sm text-gray-500 mb-2">
                      {study.company}
                    </h3>
                    <h4 className="text-3xl lg:text-4xl text-gray-900 mb-4">
                      {study.title}
                    </h4>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {study.metrics.map((metric, mIndex) => (
                        <motion.div
                          key={mIndex}
                          className="text-center"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.5 + mIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <div className={`text-3xl bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent mb-1`}>
                            {metric.value}
                          </div>
                          <div className="text-sm text-gray-500">
                            {metric.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      className={`group/btn inline-flex items-center space-x-2 bg-gradient-to-r ${study.gradient} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Read Full Case Study</span>
                      <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
