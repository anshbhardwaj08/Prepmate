import { Container, SectionHeading } from "../common";
const Footer = () => (
  <footer className="border-t border-slate-900 bg-slate-950 py-10">
    <Container>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <span className="text-xs font-bold tracking-[0.15em] uppercase text-slate-700">
          PREP<span className="text-indigo-500">MATE</span> AI
        </span>
        <p className="text-slate-800 text-xs">© 2026 PrepMate AI. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" className="text-xs text-slate-700 hover:text-slate-500 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;