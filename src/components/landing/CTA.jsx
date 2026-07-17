import { Container, Button } from "../common";

const CTA = () => (
  <section className="relative bg-[#080F1E] py-20 sm:py-28 text-center overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.14)_0%,transparent_65%)] pointer-events-none" />
    <Container className="relative z-10">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-bold tracking-wider uppercase text-indigo-400 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_#6366f1]" />
        Start for free
      </span>
      <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto leading-tight mb-5">
        Ready to crack your{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">dream job?</span>
      </h2>
      <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Join thousands of developers who landed top roles with AI-powered practice.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button>Get started free →</Button>
        <a
          href="#how-it-works"
          className="w-full sm:w-auto text-slate-500 hover:text-white text-sm font-semibold border border-slate-800 hover:border-slate-600 px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-slate-900"
        >
          See how it works
        </a>
      </div>
    </Container>
  </section>
);

export default CTA;