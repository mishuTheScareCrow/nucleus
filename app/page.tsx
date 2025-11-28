"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Sparkles, Layout, Lock, ArrowRight, Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { TrustedBy } from "@/components/landing/trusted-by";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030303]/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="size-8 bg-white rounded-lg flex items-center justify-center text-black shadow-lg shadow-white/10"
            >
              <Layout className="size-5" />
            </motion.div>
            <span>Nucleus</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-white/5">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gap-2 group bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10">
                Get Started
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background Elements - Dark & Subtle */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] opacity-30"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        </div>

        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Badge variant="secondary" className="gap-1 rounded-full py-1.5 px-4 text-sm bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 transition-colors">
                <Sparkles className="size-3.5 text-indigo-400" />
                <span>Reinventing the way you study</span>
                </Badge>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl leading-[1.1] pb-2"
            >
              Your AI-Powered <br className="hidden md:block" /> Study OS
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-zinc-400 max-w-2xl leading-relaxed"
            >
              Nucleus organizes your academic life with intelligent task prioritization, built-in focus tools, and distraction-free workflows.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base rounded-full bg-white text-black hover:bg-zinc-200 shadow-xl shadow-white/5 hover:scale-105 transition-all">
                  Start for free
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full border-zinc-800 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-900 hover:text-white transition-all hover:scale-105">
                  View Demo
                </Button>
              </Link>
            </motion.div>

            {/* Enhanced Dashboard Preview */}
            <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", bounce: 0.2 }}
                className="mt-16 relative w-full max-w-5xl aspect-[16/10] rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-50 pointer-events-none"></div>
              
              {/* Mock UI Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="size-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                    <div className="size-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 h-6 w-64 rounded-md bg-white/5" />
              </div>

              {/* Mock UI Body */}
              <div className="flex h-[calc(100%-3rem)]">
                {/* Sidebar */}
                <div className="w-64 border-r border-white/5 p-4 flex flex-col gap-3 hidden md:flex">
                    <div className="h-8 w-full rounded-md bg-white/10" />
                    <div className="h-8 w-full rounded-md bg-white/5" />
                    <div className="h-8 w-full rounded-md bg-white/5" />
                    <div className="mt-auto h-12 w-full rounded-md bg-white/5" />
                </div>
                
                {/* Main Content */}
                <div className="flex-1 p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="h-8 w-48 rounded-md bg-white/10" />
                        <div className="h-8 w-24 rounded-md bg-white/10" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-32 rounded-xl bg-white/5 border border-white/5" />
                        <div className="h-32 rounded-xl bg-white/5 border border-white/5" />
                        <div className="h-32 rounded-xl bg-white/5 border border-white/5" />
                    </div>

                    <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4">
                         <div className="h-4 w-1/3 rounded bg-white/10 mb-4" />
                         <div className="space-y-3">
                            <div className="h-12 w-full rounded-lg bg-white/5 border border-white/5" />
                            <div className="h-12 w-full rounded-lg bg-white/5 border border-white/5" />
                            <div className="h-12 w-full rounded-lg bg-white/5 border border-white/5" />
                         </div>
                    </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 p-4 rounded-xl bg-[#111] border border-white/5 shadow-xl z-10"
              >
                 <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-xs font-medium text-zinc-300">Focus Mode Active</span>
                 </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <TrustedBy />

        {/* Features Section */}
        <section id="features" className="py-24 relative border-t border-white/5 bg-[#050505]">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold tracking-tighter text-white"
              >
                Focus on what matters
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-zinc-400 text-lg max-w-2xl"
              >
                Powerful features designed to help you conquer your coursework without the stress.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Brain className="size-10 text-indigo-400" />}
                title="Smart Prioritization"
                description="Our AI analyzes your deadlines and estimated effort to automatically sort your tasks by urgency."
                delay={0.2}
              />
              <FeatureCard 
                icon={<Clock className="size-10 text-amber-400" />}
                title="Built-in Pomodoro"
                description="Stay in the flow with integrated focus timers linked directly to your task list."
                delay={0.3}
              />
              <FeatureCard 
                icon={<Lock className="size-10 text-purple-400" />}
                title="Distraction-free"
                description="A minimalist interface that hides clutter so you can focus entirely on the task at hand."
                delay={0.4}
              />
            </div>
          </div>
        </section>

        <div id="how-it-works">
            <HowItWorks />
        </div>

        <Testimonials />

      </main>

      <footer className="py-12 border-t border-white/5 bg-[#030303]">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <div className="size-8 bg-white rounded-lg flex items-center justify-center text-black">
                        <Layout className="size-5" />
                    </div>
                    <span>Nucleus</span>
                </div>
                <div className="text-zinc-600 text-sm">
                    &copy; {new Date().getFullYear()} Nucleus. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="text-zinc-600 hover:text-white transition-colors">
                        <Twitter className="size-5" />
                    </Link>
                    <Link href="#" className="text-zinc-600 hover:text-white transition-colors">
                        <Github className="size-5" />
                    </Link>
                    <Link href="#" className="text-zinc-600 hover:text-white transition-colors">
                        <Linkedin className="size-5" />
                    </Link>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string, delay: number }) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Card className="h-full border border-white/5 bg-[#0A0A0A] hover:bg-[#111] transition-all duration-300 group">
        <CardHeader className="gap-4">
            <div className="mb-2 inline-block rounded-xl bg-[#151515] border border-white/5 p-3 group-hover:bg-[#1A1A1A] transition-colors">
            {icon}
            </div>
            <CardTitle className="text-xl text-zinc-100">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {description}
            </p>
        </CardContent>
        </Card>
    </motion.div>
  );
}
