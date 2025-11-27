import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, Sparkles, Layout, Lock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Layout className="size-5" />
            </div>
            <span>Nucleus</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="hover:text-primary transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gap-2 group">
                Get Started
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))]"></div>
          
          <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8">
            <Badge variant="secondary" className="gap-1 rounded-full py-1 px-3 text-sm backdrop-blur-md border bg-background/50">
              <Sparkles className="size-3.5 text-primary" />
              <span>Reinventing the way you study</span>
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent max-w-4xl">
              Your AI-Powered <br className="hidden md:block" /> Study OS
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Nucleus organizes your academic life with intelligent task prioritization, built-in focus tools, and distraction-free workflows.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all">
                  Start for free
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Screenshot Placeholder with Glassmorphism */}
            <div className="mt-16 relative w-full max-w-5xl aspect-[16/9] rounded-2xl border bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                <div className="flex flex-col items-center gap-4">
                  <Layout className="size-20 stroke-1" />
                  <span className="text-lg font-medium">Dashboard Preview</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center gap-4 mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Focus on what matters
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Powerful features designed to help you conquer your coursework without the stress.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Brain className="size-10 text-blue-500" />}
                title="Smart Prioritization"
                description="Our AI analyzes your deadlines and estimated effort to automatically sort your tasks by urgency."
              />
              <FeatureCard 
                icon={<Clock className="size-10 text-orange-500" />}
                title="Built-in Pomodoro"
                description="Stay in the flow with integrated focus timers linked directly to your task list."
              />
              <FeatureCard 
                icon={<Lock className="size-10 text-purple-500" />}
                title="Distraction-free"
                description="A minimalist interface that hides clutter so you can focus entirely on the task at hand."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Nucleus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors duration-300">
      <CardHeader className="gap-4">
        <div className="mb-2 inline-block rounded-lg bg-background p-3 shadow-sm ring-1 ring-border w-fit">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
