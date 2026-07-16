import { BrainCircuit, Briefcase, CheckCircle2, Clock3, TrendingUp } from "lucide-react";

const skills = [
  { name: "React",      score: 94, color: "from-sky-500 to-cyan-400"    },
  { name: "JavaScript", score: 91, color: "from-yellow-400 to-amber-500" },
  { name: "Node.js",    score: 88, color: "from-green-400 to-emerald-500"},
  { name: "MongoDB",    score: 84, color: "from-emerald-400 to-teal-500" },
];

const DashboardPreview = () => {
  return (
    <div className="relative w-full max-w-lg">

      {/* ── Floating score chip (top-left) ── */}
      <div className="absolute -left-6 top-8 z-10 hidden xl:block animate-float">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
            <TrendingUp size={20} className="text-green-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Overall Score</p>
            <p className="text-lg font-black text-white">94%</p>
          </div>
          <div className="ml-1 flex h-2 w-2 animate-pulse rounded-full bg-green-400" />
        </div>
      </div>

      {/* ── Floating next interview chip (bottom-right) ── */}
      <div className="absolute -right-6 -bottom-8 z-10 hidden xl:block animate-float-delayed">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-900/90 px-4 py-3 shadow-xl shadow-black/30 backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/20">
            <Clock3 size={20} className="text-sky-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">Next Interview</p>
            <p className="text-sm font-semibold text-white">React Frontend</p>
          </div>
        </div>
      </div>

      {/* ── Main card ── */}
      <div className="relative rounded-3xl border border-slate-700/60 bg-slate-900/80 p-7 shadow-2xl shadow-black/40 backdrop-blur-sm">

        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-500/5 via-transparent to-violet-500/5" />

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Candidate Dashboard</h2>
            <p className="mt-0.5 text-sm text-slate-400">AI Performance</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 shadow-lg shadow-violet-900/40">
            <BrainCircuit size={20} className="text-white" />
          </div>
        </div>

        {/* Interview progress */}
        <div className="mt-7">
          <div className="mb-2.5 flex justify-between text-sm">
            <span className="text-slate-400">Interview Progress</span>
            <span className="font-semibold text-white">94%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-2.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-violet-500 transition-all duration-700"
              style={{ width: "94%" }}
            />
          </div>
        </div>

        {/* Skill bars */}
        <div className="mt-7 space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-300">{skill.name}</span>
                <span className="font-medium text-white">{skill.score}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent interviews */}
        <div className="mt-7 rounded-2xl border border-slate-700/50 bg-slate-800/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Recent Interviews</h3>
            <Briefcase size={16} className="text-sky-400" />
          </div>
          <div className="space-y-3.5">
            {[
              { label: "Frontend React",  score: "96" },
              { label: "JavaScript Core", score: "91" },
              { label: "Node.js & APIs",  score: "88" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="shrink-0 text-green-400" />
                  <span className="text-sm text-slate-300">{item.label}</span>
                </div>
                <span className="rounded-lg bg-slate-700/60 px-2.5 py-0.5 text-xs font-semibold text-white">
                  {item.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;