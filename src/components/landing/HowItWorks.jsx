import { Container, SectionHeading } from "../common";

const steps = ["Create Account", "Choose Interview", "Answer Questions", "AI Evaluation", "View Analytics"];

const HowItWorks = () => (
  <section id="how-it-works" className="relative bg-[#080F1E] py-24">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />
    <Container>
      <div className="text-center mb-16">
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-400 mb-3">Process</span>
        <SectionHeading title="How It Works" subtitle="From zero to offer-ready in five steps." />
      </div>

      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-4 sm:hidden">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-4">
            <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-base font-black border transition-all duration-300 ${i % 2 === 0 ? 'bg-indigo-950/60 border-indigo-500 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
              {i + 1}
            </div>
            <span className="text-sm font-semibold text-slate-400 leading-snug">{step}</span>
          </div>
        ))}
      </div>

      {/* Desktop: horizontal steps */}
      <div className="relative hidden sm:grid grid-cols-5 gap-0">
        <div className="absolute top-[30px] left-[10%] right-[10%] h-px bg-gradient-to-r from-slate-800 via-indigo-600 to-slate-800 z-0" />
        {steps.map((step, i) => (
          <div key={step} className="group relative z-10 flex flex-col items-center text-center px-2">
            <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center text-lg font-black mb-5 border transition-all duration-300 group-hover:border-cyan-400 group-hover:text-cyan-400 group-hover:shadow-[0_0_28px_rgba(6,182,212,0.3)] group-hover:scale-110 ${i % 2 === 0 ? 'bg-indigo-950/60 border-indigo-500 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
              {i + 1}
            </div>
            <span className="text-[13px] font-semibold text-slate-500 group-hover:text-slate-200 transition-colors duration-200 leading-snug">{step}</span>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default HowItWorks;