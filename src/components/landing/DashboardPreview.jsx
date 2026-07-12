import {
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import { Card } from "../common";

const skills = [
  {
    name: "React",
    score: 94,
    color: "bg-blue-500",
  },
  {
    name: "JavaScript",
    score: 91,
    color: "bg-yellow-500",
  },
  {
    name: "Node.js",
    score: 88,
    color: "bg-green-500",
  },
  {
    name: "MongoDB",
    score: 84,
    color: "bg-emerald-500",
  },
];

const DashboardPreview = () => {
  return (
    <div className="relative">

      {/* Floating Card Top */}

      <Card className="absolute -left-20 top-10 hidden w-52 animate-pulse p-5 xl:block">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-500/20 p-3">

            <TrendingUp
              size={24}
              className="text-green-400"
            />

          </div>

          <div>

            <p className="text-sm text-slate-400">
              Overall Score
            </p>

            <h3 className="text-2xl font-bold text-white">
              94%
            </h3>

          </div>

        </div>

      </Card>

      {/* Floating Card Bottom */}

      

      {/* Main Dashboard */}

      <Card className="w-full max-w-md p-7">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold text-white">

              Candidate Dashboard

            </h2>

            <p className="text-sm text-slate-400">

              AI Performance

            </p>

          </div>

          <div className="rounded-xl bg-blue-600 p-3">

            <BrainCircuit className="text-white" />

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="mb-3 flex justify-between">

            <span className="text-slate-400">

              Interview Progress

            </span>

            <span className="font-semibold text-white">

              94%

            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-700">

            <div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
              style={{
                width: "94%",
              }}
            />

          </div>

        </div>

        {/* Skills */}

        <div className="mt-8 space-y-5">

          {skills.map((skill) => (

            <div key={skill.name}>

              <div className="mb-2 flex justify-between">

                <span className="text-slate-300">

                  {skill.name}

                </span>

                <span className="text-white">

                  {skill.score}%

                </span>

              </div>

              <div className="h-2 rounded-full bg-slate-700">

                <div
                  className={`h-2 rounded-full ${skill.color}`}
                  style={{
                    width: `${skill.score}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Recent Interviews */}

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-800/60 p-5">

          <div className="mb-4 flex items-center justify-between">

            <h3 className="font-semibold text-white">

              Recent Interviews

            </h3>

            <Briefcase
              size={18}
              className="text-blue-400"
            />

          </div>

          <div className="space-y-4">

            {[
              "Frontend React",
              "JavaScript",
              "Node.js",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center justify-between"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={18}
                    className="text-green-400"
                  />

                  <span className="text-slate-300">

                    {item}

                  </span>

                </div>

                <span className="font-semibold text-white">

                  90+

                </span>

              </div>


            ))}
            <div>   
            <Card className="absolute right-7 -bottom-29

             hidden w-56 p-5 xl:block">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-500/20 p-3">

            <Clock3
              size={24}
              className="text-blue-400"
            />

          </div>

          <div>

            <p className="text-sm text-slate-400">

              Next Interview

            </p>

            <h3 className="font-semibold text-white">

              React Frontend

            </h3>

          </div>

        </div>

      </Card>
      </div>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default DashboardPreview;