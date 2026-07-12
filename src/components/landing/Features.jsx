import {
  BrainCircuit,
  ChartColumn,
  Clock3,
  FileText,
  ShieldCheck,
  Trophy,
} from "lucide-react";

import { Card, Container, SectionHeading } from "../common";

const features = [
  {
    title: "AI Evaluation",
    icon: BrainCircuit,
    desc: "Instant AI-powered interview feedback.",
  },
  {
    title: "Performance Analytics",
    icon: ChartColumn,
    desc: "Track your interview growth.",
  },
  {
    title: "Resume Upload",
    icon: FileText,
    desc: "Manage resumes in one place.",
  },
  {
    title: "Timed Interviews",
    icon: Clock3,
    desc: "Experience real interview pressure.",
  },
  {
    title: "Secure Authentication",
    icon: ShieldCheck,
    desc: "Appwrite powered authentication.",
  },
  {
    title: "Placement Ready",
    icon: Trophy,
    desc: "Prepare for top companies.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-950 py-24">
      <Container>

        <SectionHeading
          title="Everything You Need"
          subtitle="A complete AI interview preparation platform."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="p-8 hover:border-blue-500 transition"
              >

                <Icon
                  className="text-blue-400"
                  size={40}
                />

                <h3 className="mt-6 text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-400">
                  {feature.desc}
                </p>

              </Card>
            );

          })}

        </div>

      </Container>
    </section>
  );
};

export default Features;