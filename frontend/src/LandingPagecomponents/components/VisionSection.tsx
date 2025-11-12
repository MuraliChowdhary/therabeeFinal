import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import familyImage from "../../assets/family-therapist-illustration.jpg";

interface VisionSectionProps {
  darkMode?: boolean
}

const VisionSection: React.FC<VisionSectionProps> = ({ darkMode = false }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 relative overflow-hidden ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl ${
            darkMode ? 'bg-accent-blue/10' : 'bg-accent-blue/15'
          }`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ perspective: "1000px" }}
            >
              <img
                src={familyImage}
                alt="Happy family with therapist showing care and support"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* 3D Floating Elements */}
              <motion.div
                className={`absolute -top-4 -left-4 w-12 h-12 rounded-full ${
                  darkMode ? 'bg-accent-blue/30' : 'bg-accent-blue/40'
                } backdrop-blur-sm`}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                  y: [0, -20, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)'
                }}
              />
              <motion.div
                className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full ${
                  darkMode ? 'bg-accent-green/30' : 'bg-accent-green/40'
                } backdrop-blur-sm`}
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [360, 180, 0],
                  y: [0, -15, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                style={{
                  boxShadow: '0 0 15px rgba(147, 51, 234, 0.4)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Our                 <motion.span 
                  className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}
                >
                  Mission
                </motion.span>
              </h2>
              <motion.div 
                className={`w-16 h-1 rounded-full ${
                  darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
                }`}
                initial={{ width: 0 }}
                animate={isInView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
            
            <div className="space-y-4">
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                At Therabee, we aim to make therapy accessible, secure, and seamless 
                for every child. We believe that mental health support should be available 
                when and where families need it most.
              </p>
              
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our platform bridges the gap between families seeking help and qualified 
                therapists ready to provide compassionate, professional care through 
                innovative technology.
              </p>
            </div>

            {/* Mission Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {['Accessible Care', 'Verified Therapists', 'Secure Platform', 'Family-Centered'].map((point, index) => (
                <motion.div 
                  key={point}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${
                      darkMode ? 'bg-accent-blue' : 'bg-accent-blue'
                    }`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {point}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;