"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Mail, Phone, MapPin, Copy, Send, Check } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    showToast("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill out all fields.");
      return;
    }

    setSending(true);

    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    );
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      showToast("Email client opened. You can now send your message!");

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#06B6D4", "#2563EB", "#10B981"],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-12 relative">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 font-semibold text-sm shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-cyan-400" />
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
          07. Contact
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight mb-16">
        Let's <span className="text-cyan-400 font-extrabold">Connect</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Side */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold font-title text-white mb-6">
              Start a Conversation
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              Have an opening, an interesting backend or ML problem to solve, or just want to chat about building strong products? Reach out directly via the channels below or drop a note here.
            </p>
            <p className="text-xs text-slate-500 mb-2 p-4 rounded-lg bg-slate-900/40 border border-slate-800/50 leading-relaxed">
              <span className="font-semibold text-slate-300 block mb-2">✉️ How it works:</span> 
              Fill out the form below and click <span className="font-bold text-cyan-400">Send</span>. Your email client will automatically open with your message ready to go. All you need to do is hit send! Messages go directly to <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.email}</span>
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    Direct Email
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-200">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 text-slate-500 hover:text-white transition-all cursor-pointer"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-blue-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    Call / Text
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-200">
                    {PERSONAL_INFO.phone}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-900 text-purple-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                    Location
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-200">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl glass-panel border border-slate-800"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or role details..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-cyan-500/10 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
