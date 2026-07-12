import { Button, Container } from "../common";

const CTA = () => {
  return (
    <section className="bg-slate-950 py-24">

      <Container className="text-center">

        <h2 className="text-5xl font-black text-white">
          Ready to Crack Your Dream Job?
        </h2>

        <p className="mt-6 text-slate-400">
          Start practicing today.
        </p>

        <div className="mt-10">

          <Button>

            Get Started

          </Button>

        </div>

      </Container>

    </section>
  );
};

export default CTA;