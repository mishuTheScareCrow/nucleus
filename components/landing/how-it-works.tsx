"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ListTodo, Timer, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: <ListTodo className="size-8 text-blue-400" />,
    title: "1. Add Your Tasks",
    description: "Input your assignments, exams, and readings. Nucleus automatically organizes them by priority.",
  },
  {
    icon: <Timer className="size-8 text-purple-400" />,
    title: "2. Focus & Work",
    description: "Enter a distraction-free zone with built-in Pomodoro timers and ambient soundscapes.",
  },
  {
    icon: <BarChart3 className="size-8 text-emerald-400" />,
    title: "3. Track Progress",
    description: "Visualize your study habits and improvements with detailed analytics and insights.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            How Nucleus Works
          </h2>
          <p className="text-zinc-400 text-lg">
            A simple, science-backed workflow to help you achieve more in less time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center gap-4"
            >
              <div className="relative z-10 bg-[#0A0A0A] p-4 rounded-2xl border border-white/10 shadow-xl group hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
