"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Copy, Send, Check, Sparkles, CheckCircle2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { PERSONAL_INFO } from "@/lib/data";
import confetti from "canvas-confetti";
import { sounds } from "@/lib/sound";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopyEmail = () => {
    sounds.playChime();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    setSending(true);
    setErrorMessage(null);
    sounds.playChime();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Transmission error");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#0284C7", "#EF4444", "#FBBF24", "#38BDF8", "#FFFFFF"],
      });
    } catch {
      setErrorMessage("Something went wrong. You can also reach out directly via email or LinkedIn!");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-16 relative">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-sky-300 text-sky-800 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Get In Touch • Contact</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-title tracking-tight text-slate-900">
          Let&apos;s Build <span className="text-sky-600">Together</span>
        </h2>
        <p className="text-slate-600 text-base sm:text-lg max-w-xl mt-3 leading-relaxed">
          Open to full-time Software Development Engineer, Backend, and distributed systems roles. Drop a note directly below!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white/80 border border-sky-200 shadow-md space-y-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold font-title text-slate-900">
            Direct Contact Channels
          </h3>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
              <div className="p-2.5 rounded-xl bg-white text-sky-600 shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Email
                </p>
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {PERSONAL_INFO.email}
                </p>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 text-slate-600 hover:text-sky-600 transition-all cursor-pointer shadow-sm"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
              <div className="p-2.5 rounded-xl bg-white text-amber-500 shadow-sm">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Phone
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100">
              <div className="p-2.5 rounded-xl bg-white text-indigo-500 shadow-sm">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Location
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {PERSONAL_INFO.location}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-400 text-xs font-semibold transition-all shadow-sm"
            >
              <FaGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-400 text-xs font-semibold transition-all shadow-sm"
            >
              <FaLinkedin className="w-4 h-4 text-sky-600" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Form Column with Direct In-App Submission */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white/80 border border-sky-200 shadow-md backdrop-blur-sm">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center flex flex-col items-center justify-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-title text-slate-900">
                Message Sent Successfully!
              </h3>
              <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                Thank you for reaching out! Your message has been received, and Mahammad will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <>
              <h3 className="text-xl font-bold font-title text-slate-900 mb-6">
                Send a Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2">
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-600 font-bold mb-2">
                    Message / Opportunity Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share details about the role, project, or opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all text-sm resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-sky-500/20"
                >
                  {sending ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message (In-App)</span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
