import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import familyImage from "../../assets/family-therapist-illustration.jpg";

interface VisionSectionProps {
  darkMode?: boolean
}

const VisionSection: React.FC<VisionSectionProps> = ({ darkMode = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative">
              <img
                src={familyImage}
                alt="Happy family with therapist showing care and support"
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="space-y-4">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Our <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
                  Mission
                </span>
              </h2>
              <div className={`w-16 h-1 rounded-full ${
                darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
              }`} />
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: "easeOut" }}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    darkMode ? 'bg-accent-blue' : 'bg-accent-blue'
                  }`} />
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
