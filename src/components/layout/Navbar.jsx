import { Menu, X, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Container } from "../common";

const navItems = [
  {
    name: "Features",
    link: "#features",
  },
  {
    name: "How It Works",
    link: "#how-it-works",
  },
  {
    name: "Categories",
    link: "#categories",
  },
  {
    name: "Contact",
    link: "#footer",
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">

      <Container>

        <nav className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
              <BrainCircuit
                size={24}
                className="text-white"
              />

            </div>

            <div>

              <h2 className="text-xl font-black tracking-wide text-white">

                PrepMate AI

              </h2>

              <p className="text-xs text-slate-400">

                AI Placement Platform

              </p>

            </div>

          </Link>

          {/* Desktop Menu */}

          <ul className="hidden items-center gap-10 lg:flex">

            {navItems.map((item) => (
              <li key={item.name}>

                <a
                  href={item.link}
                  className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
                >
                  {item.name}
                </a>

              </li>
            ))}

          </ul>

          {/* Desktop Buttons */}

          <div className="hidden items-center gap-4 lg:flex">

            <Link to="/login">

              <Button variant="secondary">

                Login

              </Button>

            </Link>

            <Link to="/signup">

              <Button>

                Get Started

              </Button>

            </Link>

          </div>

          {/* Mobile */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white lg:hidden"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>

        </nav>

      </Container>

      {/* Mobile Menu */}

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-96 border-t border-slate-800"
            : "max-h-0"
        }`}
      >

        <Container>

          <div className="space-y-5 py-6">

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="block text-slate-300 hover:text-blue-400"
              >
                {item.name}
              </a>
            ))}

            <div className="flex gap-4 pt-4">

              <Link
                to="/login"
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  className="w-full"
                >
                  Login
                </Button>
              </Link>

              <Link
                to="/signup"
                className="flex-1"
              >
                <Button className="w-full">

                  Get Started

                </Button>
              </Link>

            </div>

          </div>

        </Container>

      </div>

    </header>
  );
};

export default Navbar;