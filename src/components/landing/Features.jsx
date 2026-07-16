import {
  BrainCircuit,
  ChartColumn,
  Clock3,
  FileText,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { Container } from "../common";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Evaluation",
    desc: "Get instant, detailed feedback after every answer. Our AI scores your response on accuracy, depth, and communication — just like a real interviewer.",
    accent: "from-sky-500 to-cyan-400",
    glow: "group-hover:shadow-sky-500/20",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
  },
  {
    icon: ChartColumn,
    title: "Performance Analytics",
    desc: "Visual dashboards show your improvement over time, highlight weak spots, and suggest exactly what to practice next.",
    accent: "from-violet-500 to-purple-400",
    glow: "group-hover:shadow-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    icon: FileText,
    title: "Resume Upload",
    desc: "Upload your resume once. PrepMate AI tailors interview questions to your experience level and target companies.",
    accent: "from-amber-500 to-yellow-400",
    glow: "group-hover:shadow-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Clock3,
    title: "Timed Interviews",
    desc: "Experience real interview pressure with countdown timers. Build speed and composure before the actual day.",
    accent: "from-rose-500 to-pink-400",
    glow: "group-hover:shadow-rose-500/20",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    desc: "Powered by Appwrite — your data, sessions, and progress are always private and securely managed.",
    accent: "from-green-500 to-emerald-400",
    glow: "group-hover:shadow-green-500/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Trophy,
    title: "Placement Ready",
    desc: "Company-specific question banks covering Google, Amazon, Meta, Infosys, TCS and 100+ more. Practice the exact patterns they use.",
    accent: "from-sky-500 to-violet-500",
    glow: "group-hover:shadow-sky-500/20",
    iconBg: "bg-gradient-to-br from-sky-500/10 to-violet-500/10",
    iconColor: "text-sky-400",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative bg-slate-950 py-28">

      {/* Subtle mid-section glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/8 blur-[120px]" />

      <Container>

        {/* Section header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-400">
            Features
          </span>
          <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-sky-400 to-violet-500 bg-clip-text text-transparent">
              Land the Job
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            A complete AI-powered interview preparation platform — from your first practice to your final offer.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-2xl ${f.glow}`}
              >
                {/* Hover gradient shimmer */}
                <div className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />

                {/* Icon */}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.iconBg}`}>
                  <Icon size={24} className={f.iconColor} />
                </div>

                {/* Text */}
                <h3 className="mt-6 text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>

                {/* Bottom accent line */}
                <div className={`mt-6 h-px w-12 rounded-full bg-gradient-to-r ${f.accent} opacity-60 transition-all duration-300 group-hover:w-full group-hover:opacity-100`} />
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
};

export default Features;