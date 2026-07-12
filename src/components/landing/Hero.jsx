import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Star,
  Users,
  Trophy,
} from "lucide-react";

import {
  Badge,
  Button,
  Container,
} from "../common";

import DashboardPreview from "./DashboardPreview";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-32 pb-24">

      {/* Background Glow */}

      <div className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute bottom-[-150px] right-[-120px] h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[140px]" />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)] bg-[size:70px_70px]" />

      <Container>

        <div className="relative flex flex-col items-center gap-20 lg:flex-row">

          {/* Left */}

          <div className="flex-1">

            <Badge>

              <Sparkles
                size={16}
                className="mr-2"
              />

              AI Powered Placement Platform

            </Badge>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

              Ace Every

              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">

                Tech Interview

              </span>

              with AI

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              Practice company-level interviews, receive
              instant AI feedback, improve weak areas,
              and track your complete placement journey
              in one platform.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <Button className="flex items-center gap-2">

                Start Free

                <ArrowRight size={18} />

              </Button>

              <Button
                variant="secondary"
                className="flex items-center gap-2"
              >

                <PlayCircle size={18} />

                Watch Demo

              </Button>

            </div>

            {/* Stats */}

            <div className="mt-14 flex flex-wrap gap-10">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-yellow-500/20 p-3">

                  <Star
                    className="text-yellow-400"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-white">

                    4.9 / 5

                  </h3>

                  <p className="text-sm text-slate-400">

                    Student Rating

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-500/20 p-3">

                  <Users
                    className="text-green-400"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-white">

                    15K+

                  </h3>

                  <p className="text-sm text-slate-400">

                    Interviews Taken

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-blue-500/20 p-3">

                  <Trophy
                    className="text-blue-400"
                    size={22}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-white">

                    120+

                  </h3>

                  <p className="text-sm text-slate-400">

                    Companies Covered

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="relative flex flex-1 justify-center">

            <DashboardPreview />

          </div>

        </div>

      </Container>

    </section>
  );
};

export default Hero;