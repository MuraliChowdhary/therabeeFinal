import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Video, Calendar, CreditCard, Bell, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface FeaturesSectionProps {
  darkMode?: boolean
}

const features = [
  {
    icon: Shield,
    title: "Secure Authentication & Privacy",
    description: "HIPAA-compliant platform with end-to-end encryption to protect your family's sensitive information."
  },
  {
    icon: Video,
    title: "Real-Time Video Sessions",
    description: "High-quality video calls with screen sharing, interactive tools, and secure session recording."
  },
  {
    icon: Calendar,
    title: "Smart Booking & Scheduling",
    description: "Easy appointment scheduling with calendar integration, automated reminders, and rescheduling options."
  },
  {
    icon: CreditCard,
    title: "Safe Payments & Transactions",
    description: "Secure payment processing with multiple options, insurance integration, and transparent pricing."
  },
  {
    icon: Bell,
    title: "In-App Notifications & Reminders",
    description: "Stay connected with timely reminders, session notifications, and important updates from your therapist."
  },
  {
    icon: BarChart3,
    title: "Progress Reports & History",
    description: "Track your child's progress with detailed reports, session notes, and milestone achievements."
  }
];

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ darkMode = false }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >

      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              darkMode ? 'bg-accent-blue/5' : 'bg-accent-blue/10'
            } blur-3xl`}
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${i * 15}%`,
              top: `${i * 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0],
              y: [0, (i % 2 === 0 ? -1 : 1) * 20, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
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
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Everything You Need for{" "}
            <motion.span 
              className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}
            >
              Successful Therapy
            </motion.span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Our comprehensive platform provides all the tools families and therapists need 
            for effective, secure, and convenient therapy sessions.
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                rotateY: 5,
                rotateX: 5
              }}
              style={{ perspective: "1000px" }}
            >
              <Card className={`group hover:shadow-2xl transition-all duration-300 h-full border ${
                darkMode 
                  ? 'border-gray-700 bg-black' 
                  : 'border-[#E6E6E6] bg-white'
              } relative overflow-hidden`}>
                {/* 3D Glow Effect */}
                <motion.div
                  className={`absolute inset-0 ${
                    darkMode 
                      ? 'bg-accent-blue/10' 
                      : 'bg-accent-blue/5'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={{
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <motion.div 
                    className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden ${
                      darkMode ? 'bg-accent-blue/30' : 'bg-accent-blue/40'
                    }`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: darkMode 
                        ? '0 10px 30px rgba(167, 199, 231, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.05)' 
                        : '0 10px 30px rgba(167, 199, 231, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <feature.icon className={`w-7 h-7 sm:w-8 sm:h-8 relative z-10 ${
                      darkMode ? 'text-white' : 'text-[#1A1A1A]'
                    }`} />
                  </motion.div>
                  <CardTitle className={`text-lg sm:text-xl font-semibold transition-colors duration-300 ${
                    darkMode 
                      ? 'text-white group-hover:text-accent-blue' 
                      : 'text-[#1A1A1A] group-hover:text-[#4D4D4D]'
                  }`}>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`text-sm sm:text-base text-center leading-relaxed ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className={`text-base sm:text-lg mb-6 px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to experience the future of therapy?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to="/login">
                <button className={`px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto flex items-center justify-center ${
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

export default FeaturesSection;