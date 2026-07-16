import { Container, SectionHeading } from "../common";
 const stats = [["500+", "Questions"], ["100+", "Companies"], ["95%", "Accuracy"], ["24/7", "AI Feedback"]];

const Stats = () => (
  <section className="relative bg-slate-950 py-20 overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
    <Container>
      <div className="grid grid-cols-4 gap-px bg-slate-800/50 rounded-2xl border border-slate-800 overflow-hidden">
        {stats.map(([num, label]) => (
          <div key={label} className="bg-[#080F1E] hover:bg-slate-900/80 transition-colors duration-200 text-center py-10 px-6">
            <div className="text-5xl font-black tracking-tight bg-gradient-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">{num}</div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default Stats;