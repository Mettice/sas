import { motion } from 'motion/react';
import { Code2, Database, GitBranch, Layers, Network, Workflow } from 'lucide-react';

const technologies = [
  { name: 'TensorFlow', category: 'ML Framework' },
  { name: 'PyTorch', category: 'ML Framework' },
  { name: 'AWS SageMaker', category: 'Cloud AI' },
  { name: 'Azure AI', category: 'Cloud AI' },
  { name: 'OpenAI GPT', category: 'LLM' },
  { name: 'LangChain', category: 'LLM' },
  { name: 'Kubernetes', category: 'Infrastructure' },
  { name: 'MLflow', category: 'MLOps' },
];

const capabilities = [
  {
    icon: Code2,
    title: 'Machine Learning',
    items: ['Deep Learning', 'Neural Networks', 'Supervised & Unsupervised Learning', 'Reinforcement Learning'],
  },
  {
    icon: Network,
    title: 'Natural Language Processing',
    items: ['Text Analysis', 'Sentiment Analysis', 'Language Models', 'Conversational AI'],
  },
  {
    icon: Database,
    title: 'Computer Vision',
    items: ['Image Recognition', 'Object Detection', 'Video Analysis', 'OCR Solutions'],
  },
  {
    icon: Workflow,
    title: 'Predictive Analytics',
    items: ['Forecasting', 'Pattern Recognition', 'Anomaly Detection', 'Risk Assessment'],
  },
  {
    icon: Layers,
    title: 'AI Integration',
    items: ['API Development', 'System Architecture', 'Legacy Integration', 'Scalable Solutions'],
  },
  {
    icon: GitBranch,
    title: 'MLOps & Deployment',
    items: ['Model Monitoring', 'CI/CD Pipelines', 'Version Control', 'Performance Optimization'],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />

      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block text-sm text-purple-600 bg-purple-50 px-4 py-2 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Technical Excellence
          </motion.div>
          <h2 className="text-5xl lg:text-6xl text-gray-900 mb-6">
            Our Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cutting-edge technologies and methodologies that power
            enterprise-grade AI solutions.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <capability.icon size={28} className="text-white" />
              </motion.div>

              <h3 className="text-xl text-gray-900 mb-4">
                {capability.title}
              </h3>

              <ul className="space-y-2">
                {capability.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-center text-gray-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + itemIndex * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack */}
        <motion.div
          className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-12 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl text-white mb-4">
              Technology Stack
            </h3>
            <p className="text-lg text-gray-300">
              We leverage industry-leading tools and frameworks
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative">
                  <div className="text-white mb-2">{tech.name}</div>
                  <div className="text-sm text-gray-400">{tech.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
