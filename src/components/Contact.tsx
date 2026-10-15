"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Send, Check, Sparkles } from "lucide-react";
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
    sounds.playChime();

    const subject = encodeURIComponent(`Portfolio inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\n${formData.message}`
    );
    const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;

    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      showToast("Email client opened! You can now send your message.");

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

      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Get In Touch • Contact</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-white">
          Let&apos;s Build <span className="text-sky-400">Together</span>
        </h2>
        <p className="text-slate-400 text-base sm:text-lg max-w-xl mt-3 leading-relaxed">
          Open to full-time Software Development Engineer, Backend, and Machine Learning engineering roles. Reach out directly below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-lg space-y-6">
          <h3 className="text-xl font-bold font-title text-white">
            Direct Contact Channels
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Email
                </p>
                <p className="text-sm font-semibold text-white truncate">
                  {PERSONAL_INFO.email}
                </p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Phone
                </p>
                <p className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Location
                </p>
                <p className="text-sm font-semibold text-white">
                  {PERSONAL_INFO.location}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-400 text-xs font-semibold transition-all"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-400 text-xs font-semibold transition-all"
            >
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/85 border border-slate-800 shadow-lg">
          <h3 className="text-xl font-bold font-title text-white mb-6">
            Send a Direct Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Alex Smith"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. alex@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2">
                Message / Role Details
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share details about the role, project, or opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 transition-all text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-sky-500/20"
            >
              {sending ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
