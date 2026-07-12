import { Container, SectionHeading } from "../common";

const steps = [
  "Create Account",
  "Choose Interview",
  "Answer Questions",
  "AI Evaluation",
  "View Analytics",
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-900 py-24">

      <Container>

        <SectionHeading
          title="How It Works"
          subtitle="Five simple steps."
        />

        <div className="grid gap-8 md:grid-cols-5">

          {steps.map((step, index) => (

            <div
              key={step}
              className="text-center"
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">

                {index + 1}

              </div>

              <h3 className="mt-5 text-white font-semibold">

                {step}

              </h3>

            </div>

          ))}

        </div>

      </Container>

    </section>
  );
};

export default HowItWorks;