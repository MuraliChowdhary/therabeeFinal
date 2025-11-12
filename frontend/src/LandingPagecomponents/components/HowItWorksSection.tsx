import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { UserPlus, Search, CreditCard, Video, TrendingUp } from "lucide-react";

interface HowItWorksSectionProps {
  darkMode?: boolean
}

const steps = [
  {
    icon: UserPlus,
    title: "Sign Up",
    description: "Parents and therapists register with secure verification and background checks.",
    number: "01"
  },
  {
    icon: Search,
    title: "Browse Therapists",
    description: "Explore verified therapist profiles, specializations, and real-time availability.",
    number: "02"
  },
  {
    icon: CreditCard,
    title: "Book & Pay",
    description: "Secure appointment booking with integrated payments via Stripe and Razorpay.",
    number: "03"
  },
  {
    icon: Video,
    title: "Attend Session",
    description: "Join high-quality video sessions powered by Zoom with interactive therapy tools.",
    number: "04"
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description: "Receive detailed progress reports, session summaries, and milestone updates.",
    number: "05"
  }
];

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ darkMode = false }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 relative overflow-hidden ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              darkMode ? 'bg-accent-blue/5' : 'bg-accent-blue/10'
            } blur-3xl`}
            style={{
              width: `${150 + i * 60}px`,
              height: `${150 + i * 60}px`,
              left: `${i * 25}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            How             <motion.span 
              className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}
            >
              Therabee
            </motion.span> Works
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Get started with therapy in just 5 simple steps. Our streamlined process 
            makes it easy for families to connect with the right therapist.
          </p>
          <motion.div 
            className={`w-24 h-1 rounded-full mx-auto mt-6 ${
              darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
            }`}
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <motion.div 
            className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full rounded-full opacity-30 ${
              darkMode ? 'bg-accent-blue' : 'bg-accent-blue'
            }`}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ transformOrigin: "top" }}
          />

          {/* Steps */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12"
              >
                {/* Content */}
                <motion.div 
                  className="flex-1 text-center lg:text-left w-full"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  style={{ perspective: "1000px" }}
                >
                  <div className={`rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border ${
                    darkMode 
                      ? 'bg-black border-gray-700' 
                      : 'bg-white border-[#E6E6E6]'
                  }`}>
                    <div className="flex items-center justify-center lg:justify-start mb-4">
                      <span className={`text-4xl sm:text-5xl lg:text-6xl font-bold mr-4 ${
                        darkMode ? 'text-accent-blue/20' : 'text-accent-blue/20'
                      }`}>
                        {step.number}
                      </span>
                      <motion.div 
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg ${
                          darkMode ? 'bg-accent-blue/40' : 'bg-accent-blue/50'
                        }`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          boxShadow: darkMode 
                          ? '0 8px 25px rgba(167, 199, 231, 0.3)' 
                          : '0 8px 25px rgba(167, 199, 231, 0.4)'
                        }}
                      >
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </motion.div>
                    </div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Center Circle (Desktop) */}
                <div className="hidden lg:flex items-center justify-center">
                  <motion.div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
                      darkMode ? 'bg-accent-blue/40' : 'bg-accent-blue/50'
                    }`}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      boxShadow: darkMode 
                        ? '0 0 40px rgba(167, 199, 231, 0.3)' 
                        : '0 0 40px rgba(167, 199, 231, 0.4)'
                    }}
                  >
                    <div className={`w-8 h-8 rounded-full ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`} />
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className={`rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto border ${
            darkMode 
              ? 'bg-black border-gray-700' 
              : 'bg-white border-[#E6E6E6]'
          }`}>
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Ready to Get Started?
            </h3>
            <p className={`text-sm sm:text-base mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of families who have found the right therapeutic support through Therabee.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login">
                <button className={`px-6 sm:px-8 py-3 sm:py-4 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 text-base sm:text-lg flex items-center justify-center mx-auto ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-gray-200 shadow-2xl' 
                    : 'bg-black text-white hover:bg-[#1A1A1A] shadow-lg'
                }`}>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;