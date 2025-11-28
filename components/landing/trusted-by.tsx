"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Harvard University" },
  { name: "MIT" },
  { name: "Stanford" },
  { name: "Oxford" },
  { name: "Cambridge" },
  { name: "Yale" },
];

export function TrustedBy() {
  return (
    <section className="py-12 border-b border-white/5 bg-[#030303]">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-medium text-zinc-500 mb-8">
          TRUSTED BY STUDENTS FROM TOP UNIVERSITIES
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold text-zinc-400 font-serif"
            >
              {company.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
