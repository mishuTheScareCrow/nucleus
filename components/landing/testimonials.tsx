"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Computer Science Student",
    content: "Nucleus completely changed how I study. The prioritization algorithm is a game changer for finals week.",
    avatar: "AC",
  },
  {
    name: "Sarah Miller",
    role: "Med Student",
    content: "The focus timer helps me stay on track during long study sessions. I've never been this productive.",
    avatar: "SM",
  },
  {
    name: "Jordan Taylor",
    role: "High School Senior",
    content: "I used to get overwhelmed by all my assignments. Nucleus makes it easy to see what I need to do next.",
    avatar: "JT",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-[#030303] border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Loved by Students
          </h2>
          <p className="text-zinc-400 text-lg">
            Join thousands of students who have transformed their academic performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-[#0A0A0A] border-white/5 hover:border-white/10 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-zinc-400 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
