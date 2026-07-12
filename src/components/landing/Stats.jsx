import { Container } from "../common";

const stats = [
  ["500+", "Questions"],
  ["100+", "Companies"],
  ["95%", "Accuracy"],
  ["24/7", "AI Feedback"],
];

const Stats = () => {
  return (
    <section className="bg-slate-900 py-20">

      <Container>

        <div className="grid gap-8 text-center md:grid-cols-4">

          {stats.map(([number, text]) => (

            <div key={text}>

              <h2 className="text-5xl font-black text-blue-400">

                {number}

              </h2>

              <p className="mt-2 text-slate-400">

                {text}

              </p>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
};

export default Stats;