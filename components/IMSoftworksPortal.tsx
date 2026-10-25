'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  Globe,
  Code2,
  Smartphone,
  Cloud,
  Layers,
  Palette,
  Target,
  Rocket,
  CheckCircle2,
  Copy,
  Check,
  Mail,
  Key,
  User,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';
import { Language } from '@/lib/types';

interface IMSoftworksPortalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const IMSoftworksPortal: React.FC<IMSoftworksPortalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [email] = useState('im.softwark.team@gmail.com');
  const [password, setPassword] = useState('im.softwark.pass2026');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const services = [
    {
      titleBn: 'কাস্টম সফটওয়্যার ডেভেলপমেন্ট',
      titleEn: 'Custom Software Development',
      desc: 'Tailored enterprise software designed for high scalability and complex workflows.',
      icon: Code2,
    },
    {
      titleBn: 'ওয়েব অ্যাপ্লিকেশন',
      titleEn: 'Web Applications',
      desc: 'Modern, blazing fast Next.js & Full-stack Web Apps with responsive UI.',
      icon: Globe,
    },
    {
      titleBn: 'মোবাইল অ্যাপ',
      titleEn: 'Mobile Apps',
      desc: 'Native and Cross-platform iOS & Android mobile applications.',
      icon: Smartphone,
    },
    {
      titleBn: 'ক্লাউড সল্যুশন',
      titleEn: 'Cloud Solutions',
      desc: 'Robust cloud infrastructure, DevOps pipelines, and serverless hosting.',
      icon: Cloud,
    },
    {
      titleBn: 'API ডেভেলপমেন্ট',
      titleEn: 'API Development',
      desc: 'Secure RESTful & GraphQL APIs with high availability and fast response.',
      icon: Layers,
    },
    {
      titleBn: 'UI/UX ডিজাইন',
      titleEn: 'UI/UX Design',
      desc: 'User-centered aesthetic interface designs crafted for high conversion.',
      icon: Palette,
    },
  ];

  const products = [
    {
      title: 'Automate Processes',
      titleBn: 'স্বয়ংক্রিয় প্রসেসিং',
      desc: 'Eliminate repetitive tasks with AI-driven business process automation.',
    },
    {
      title: 'Improve Efficiency',
      titleBn: 'দক্ষতা বৃদ্ধি',
      desc: 'Optimize resource allocation and streamline team workflows.',
    },
    {
      title: 'Scale with Confidence',
      titleBn: 'কনফিডেন্সের সাথে স্কেল',
      desc: 'Modular software architecture that grows as your business expands.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      className="fixed inset-0 z-50 bg-slate-950 overflow-y-auto text-slate-100 font-sans"
    >
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                🌐 IM Softworks
              </span>
              <span className="text-[10px] text-cyan-400 font-mono block">Future-Ready Software</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {['home', 'about', 'services', 'products', 'contact'].map((tab) => (
              <a
                key={tab}
                href={`#${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`capitalize hover:text-cyan-400 transition-colors whitespace-nowrap ${
                  activeTab === tab ? 'text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1' : ''
                }`}
              >
                {tab === 'about' ? 'About Us' : tab}
              </a>
            ))}
          </nav>

          {/* Close / Return Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300 hover:bg-rose-500/30 font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <X className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ফিরে যান' : 'Exit Portal'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-16">
        {/* HERO SECTION */}
        <section id="home" className="relative pt-6 pb-12 flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Futuristic Software & Digital Innovation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl leading-tight">
            We don’t just build software — <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              We build possibilities.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl leading-relaxed">
            {lang === 'bn'
              ? 'IM Softworks একটি উদীয়মান সফটওয়্যার কোম্পানি, যা ভবিষ্যতমুখী প্রযুক্তি ও সৃজনশীল সমাধানের মাধ্যমে ক্লায়েন্টদের ব্যবসায়িক সাফল্যে সহায়তা করে। আমরা বিশ্বাস করি— আমাদের উন্নতি তখনই সম্ভব, যখন আমাদের ক্লায়েন্ট লাভবান হবেন।'
              : 'IM Softworks is an emerging software company that empowers clients’ business success through futuristic technology and innovative solutions. We believe that our growth is only possible when our clients benefit.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-extrabold text-xs md:text-sm hover:shadow-lg hover:shadow-cyan-400/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Connect With Us'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#about-me"
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs md:text-sm hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'bn' ? 'ফাউন্ডার পরিচিতি' : 'Meet the Founder'}</span>
            </a>
          </div>
        </section>

        {/* OUR MISSION SECTION */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 md:w-1/2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-widest">
                <Target className="w-4 h-4" />
                <span>🎯 আমাদের লক্ষ্য / Our Mission</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                “আপনার লাভই আমাদের সফলতা।”
              </h2>
              <p className="text-xs text-cyan-300 font-mono">
                “Your profit is our success.”
              </p>
            </div>

            <div className="md:w-1/2 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
              <p>
                {lang === 'bn'
                  ? 'আমরা প্রতিটি প্রজেক্টে বিশ্বাস করি— যদি ক্লায়েন্ট উপকৃত হন, তবেই আমরা সফল। সেই লক্ষ্যেই আমাদের প্রতিটি কোড, প্রতিটি ডিজাইন এবং প্রতিটি আইডিয়া।'
                  : 'In every project, we believe that our true achievement lies in the client’s benefit. That’s why every line of our code, every design, and every idea is driven by this mission.'}
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              🏢 About Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Who We Are & What Drives Us
            </h2>
          </div>

          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl mx-auto">
            <p>
              IM Softworks is an emerging software company focused on empowering businesses with futuristic technology and innovative solutions.
            </p>
            <p className="text-white font-medium border-l-2 border-cyan-400 pl-4 py-1 italic bg-cyan-500/5 rounded-r-xl">
              We believe our success comes only when our clients succeed. That’s why we don’t just build software — we build possibilities.
            </p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              🔧 আমাদের সার্ভিসসমূহ / Our Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              End-to-End Digital Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/70 border border-white/10 hover:border-cyan-400/50 rounded-2xl p-5 space-y-3 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {lang === 'bn' ? srv.titleBn : srv.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              🛠️ Products
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Smart & Scalable Software Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              We develop smart, scalable, and future-ready software products tailored to meet the unique needs of modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 text-center space-y-3"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Rocket className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {lang === 'bn' ? prod.titleBn : prod.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT ME SECTION (FOUNDER - Mohammad Esa Ali) */}
        <section id="about-me" className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Image Container */}
            <div className="relative shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-2xl relative">
                <Image
                  src="https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg"
                  alt="Mohammad Esa Ali"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-cyan-400 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow">
                Founder
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  👋 About Me
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Mohammad Esa Ali
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  Software Developer & Creative Tech Strategist
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Hello, I am Mohammad Esa Ali, a passionate and creative tech enthusiast. I specialize in Software Development, Web Solutions, and Creative Design. My goal is to help businesses grow by building smart, future-ready, and user-friendly digital solutions.
              </p>

              <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-4 text-xs text-cyan-300 font-semibold italic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>💡 “Success comes when your clients succeed.”</span>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US & PASSWORD BOX SECTION */}
        <section id="contact" className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              📬 Connect With Us / Contact Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Get in Touch with IM Softworks
            </h2>
          </div>

          <div className="max-w-xl mx-auto space-y-4 bg-slate-950 p-6 rounded-2xl border border-white/10">
            {/* Email Box */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Official Contact Email:</span>
              </label>
              <div className="flex items-center justify-between bg-slate-900 border border-white/10 rounded-xl px-4 py-3">
                <span className="font-mono text-xs text-white font-bold select-all truncate">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors flex items-center gap-1 shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'কপি হয়েছে' : 'ইমেইল কপি'}</span>
                </button>
              </div>
            </div>

            {/* PASSWORD BOX DIRECTLY BELOW EMAIL AS REQUESTED */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>ইমেইল নিচে সিকিউরিটি পাসওয়ার্ড (Password Box):</span>
                </label>
              </div>

              {/* Editable/Copyable Password Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-amber-400/40 rounded-xl px-4 py-2.5 font-mono text-xs text-amber-200 outline-none focus:border-amber-400"
                  />
                  <button
                    onClick={handleCopyPassword}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    {copiedPass ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedPass ? 'কপি হয়েছে!' : 'পাসওয়ার্ড কপি'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {lang === 'bn'
                    ? 'এখানে কপি বাটনে ক্লিক করে পাসওয়ার্ড কপি করে ইন্টারফেস আনলক করতে পারবেন।'
                    : 'Click the copy button above to easily copy the system password.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* USEFUL LINKS & FOOTER */}
        <footer className="pt-8 border-t border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">Useful Links:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-medium">
              <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-cyan-400 transition-colors">About us</a>
              <a href="#products" className="hover:text-cyan-400 transition-colors">Products</a>
              <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Legal</a>
              <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact us</a>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/5 text-xs text-slate-500">
            <p>Copyright © IM Softwark (IM Softworks). All rights reserved.</p>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};
