import { Container, SectionHeading } from "../common";

const categories = [
  "React",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "DBMS",
  "Operating System",
  "Computer Networks",
  "HR",
];

const Categories = () => {
  return (
    <section id="categories" className="bg-slate-950 py-24">

      <Container>

        <SectionHeading
          title="Interview Categories"
          subtitle="Practice across multiple domains."
        />

        <div className="flex flex-wrap justify-center gap-5">

          {categories.map((category) => (

            <div
              key={category}
              className="rounded-full border border-slate-700 bg-slate-900 px-6 py-3 text-white"
            >

              {category}

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
};

export default Categories;