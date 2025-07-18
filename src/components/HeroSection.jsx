import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function HeroSection({ title, subtitle, iconName }) {
  return (
    <section
      className="flex items-center justify-center w-full min-h-screen px-6 pt-24 bg-gradient-to-br from-blue-600 to-blue-800"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex flex-col-reverse items-center justify-between w-full max-w-6xl gap-16 mx-auto md:flex-row">
        <motion.div
          className="space-y-4 text-center md:text-left md:w-1/2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.h1
            className="text-4xl font-bold leading-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mb-6 text-lg leading-relaxed text-blue-100 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center w-full mb-8 md:w-1/2 md:mb-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-white rounded-full opacity-5"></div>
            <div className="absolute bg-white rounded-full inset-4 opacity-10"></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <Icon
                icon={iconName}
                className="w-24 h-24 text-white md:w-32 md:h-32"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
