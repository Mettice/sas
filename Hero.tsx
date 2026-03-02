import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const floatingIcons = [
    { Icon: Sparkles, delay: 0, x: 100, y: 50 },
    { Icon: Zap, delay: 0.2, x: -80, y: 80 },
    { Icon: Brain, delay: 0.4, x: 120, y: -60 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjQzMTU5NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="AI Technology"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-400/30"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            x: [0, x, 0],
            y: [0, y, 0],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            left: `${30 + index * 20}%`,
            top: `${20 + index * 15}%`,
          }}
        >
          <Icon size={64} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 lg:px-16 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-blue-200 text-sm">AI-Powered Transformation</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-7xl lg:text-8xl text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Business with AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We help enterprises unlock the full potential of artificial intelligence through
            strategic consulting, custom solutions, and seamless implementation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center space-x-2 text-lg">
                <span>Start Your AI Journey</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all text-lg"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              View Case Studies
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '500+', label: 'Projects Delivered' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '50+', label: 'AI Experts' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
