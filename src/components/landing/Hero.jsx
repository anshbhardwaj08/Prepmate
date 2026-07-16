import { ArrowRight, PlayCircle, Sparkles, Star, Users, Trophy } from "lucide-react";
import { Container } from "../common";
import DashboardPreview from "./DashboardPreview";

const stats = [
  {
    icon: Star,
    iconClass: "text-yellow-400",
    bgClass: "bg-yellow-500/15",
    value: "4.9 / 5",
    label: "Student Rating",
  },
  {
    icon: Users,
    iconClass: "text-green-400",
    bgClass: "bg-green-500/15",
    value: "15K+",
    label: "Interviews Taken",
  },
  {
    icon: Trophy,
    iconClass: "text-sky-400",
    bgClass: "bg-sky-500/15",
    value: "120+",
    label: "Companies Covered",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-28 pt-36">

      {/* ── Background atmosphere ── */}
      <div className="pointer-events-none absolute left-[-160px] top-[-100px] h-[500px] w-[500px] rounded-full bg-sky-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-180px] right-[-140px] h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[100px]" />

      {/* ── Dot-grid overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Fade edges of grid */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />

      <Container>
        <div className="relative flex flex-col items-center gap-16 lg:flex-row lg:items-start">

          {/* ── Left column ── */}
          <div className="flex flex-1 flex-col">

            {/* Badge */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
              <Sparkles size={13} />
              AI Powered Placement Platform
            </span>

            {/* Headline */}
            <h1 className="mt-7 text-[3.25rem] font-black leading-[1.08] tracking-tight text-white md:text-[4.5rem]">
              Ace Every
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
                Tech Interview
              </span>
              with AI
            </h1>

            {/* Sub-copy */}
            <p className="mt-7 max-w-[480px] text-lg leading-[1.75] text-slate-400">
              Practice company-level interviews, receive instant AI feedback,
              improve weak areas, and track your complete placement journey —
              all in one platform.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-900/30 transition-all duration-200 hover:from-sky-400 hover:to-violet-500 hover:shadow-violet-900/50 hover:-translate-y-0.5">
                Start Free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex items-center gap-2.5 rounded-xl border border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/60 hover:text-white hover:-translate-y-0.5">
                <PlayCircle size={16} className="text-sky-400" />
                Watch Demo
              </button>
            </div>

            {/* Stats strip */}
            <div className="mt-14 flex flex-wrap gap-8">
              {stats.map(({ icon: Icon, iconClass, bgClass, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bgClass}`}>
                    <Icon size={20} className={iconClass} />
                  </div>
                  <div>
                    <p className="text-base font-bold text-white">{value}</p>
                    <p className="text-xs text-slate-400">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust line */}
            <p className="mt-8 text-xs text-slate-600">
              No credit card required · Free forever plan available
            </p>
          </div>

          {/* ── Right column — dashboard preview ── */}
          <div className="relative flex flex-1 justify-center pt-8 lg:pt-4">
            <DashboardPreview />
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;