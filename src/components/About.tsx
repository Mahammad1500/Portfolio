"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Database, Terminal } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: "Machine Learning & AI",
      desc: "Deep interest in model training, feature engineering, and causal inference. Experienced in processing large-scale datasets and optimizing algorithms for predictive accuracy.",
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: "Scalable Systems",
      desc: "Passionate about backend architectures, database indexing, and real-time streams. Designing clean API gateways and microservices that scale under demand.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "Full Stack Development",
      desc: "Delivering modern user experiences using React/Next.js paired with robust servers. Believer in type-safety, modular design, and responsive layout structures.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
                01. About Me
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-8">
              Engineering solutions at the intersection of <span className="text-cyan-400 font-extrabold">Data</span> and <span className="text-blue-500 font-extrabold">Web</span>.
            </h2>

            <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                My journey into engineering stems from a deep curiosity about how complex systems process data and deliver user actions. As a student at <strong className="text-white">IIIT Lucknow</strong>, I've focused my academic and personal pursuits on developing core software engineering skills, working on algorithmic problems, and studying machine learning.
              </p>
              <p>
                Whether it's training causal prediction models at <strong className="text-white">Flipkart</strong> using PySpark and XGBoost, or structuring real-time collaborative coding portals in node.js, I approach every project with a system-level mindset. I aim to write highly optimized, type-safe, and self-documenting code.
              </p>
              <p>
                I thrive in environments that challenge me to solve ambiguous, large-scale problems. I am continuously exploring the boundaries of AI, large language models, and predictive pipelines, looking for ways to translate complex theory into tangible user benefits.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Pillars / Cards */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl glass-panel relative overflow-hidden group border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300"
            >
              {/* Card light reflection */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/5 transition-all">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold font-title text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
