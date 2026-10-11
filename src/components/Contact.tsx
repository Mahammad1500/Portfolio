"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Send, Check, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";
import { sounds } from "@/lib/sound";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    sounds.playChime();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    showToast("Email copied to clipboard! 📋");
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
    sounds.playChime();

    const subject = encodeURIComponent(`Portfolio contact from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    );
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      showToast("Email client opened! You can now send your message 🚀");

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#0284C7", "#EF4444", "#FBBF24", "#38BDF8", "#FFFFFF"],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 px-6 py-3.5 rounded-2xl bg-slate-900 border-2 border-sky-400 text-sky-300 font-bold text-sm shadow-2xl flex items-center gap-2.5"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Anime Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-400/40 flex items-center justify-center">
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
        </div>
        <span className="text-xs uppercase tracking-widest text-sky-400 font-extrabold">
          未来通信機 • 07. Time Machine Communicator
        </span>
      </div>

      <h2 className="text-3xl md:text-5xl font-black font-title tracking-tight text-white mb-6">
        Let&apos;s Connect Across the <span className="text-sky-400">Future</span>
      </h2>

      <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
        Whether you have an engineering role opening, an intriguing backend or machine learning problem, or want to collaborate on high-impact products—reach out directly!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 relative overflow-hidden shadow-xl mb-6">
            <h3 className="text-2xl font-bold font-title text-white mb-4">
              Direct Channels
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Available for full-time Software Development Engineer, Backend, and Machine Learning opportunities.
            </p>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="p-3 rounded-xl bg-sky-500/15 text-sky-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Copy Email"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Phone / WhatsApp
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.phone}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="p-3 rounded-xl bg-indigo-500/15 text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Location Base
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 text-xs font-semibold transition-all"
              >
                <FaGithub className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 text-xs font-semibold transition-all"
              >
                <FaLinkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-sky-500/30 relative shadow-xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xl font-bold font-title text-white">
                Send a 22nd-Century Transmission
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-slate-300 font-extrabold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Nobita Nobi"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-slate-300 font-extrabold mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. future@tokyo.ac.jp"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-widest text-slate-300 font-extrabold mb-2">
                  Message / Opportunity Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share details about your team, problem space, or role opening..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/30 transition-all text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-sky-500/20 hover:scale-[1.01]"
              >
                {sending ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message (Direct Email)</span>
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
