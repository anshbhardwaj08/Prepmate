import { Container, SectionHeading } from "../common";

const categories = [
  "React", "JavaScript", "Node.js", "Express", "MongoDB",
  "DBMS", "Operating System", "Computer Networks", "HR",
];

const Categories = () => (
  <section id="categories" className="relative bg-slate-950 py-24 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent" />
    <Container>
      <div className="text-center mb-14">
        <span className="inline-block text-[11px] font-bold tracking-[0.18em] uppercase text-cyan-400 mb-3">Topics</span>
        <SectionHeading title="Interview Categories" subtitle="Master every domain — from algorithms to system design to HR." />
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <div
            key={cat}
            className="group relative px-5 py-2.5 rounded-full border border-slate-800 bg-slate-900/70 text-slate-400 text-sm font-medium transition-all duration-200 hover:text-white hover:border-indigo-500 hover:shadow-[0_0_18px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 cursor-default"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:bg-cyan-400 mr-2 mb-0.5 transition-colors duration-200" />
            {cat}
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default Categories;