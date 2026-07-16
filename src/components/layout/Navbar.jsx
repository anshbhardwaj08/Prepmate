import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";
import { Button, Container } from "../common";

const navItems = [
  { name: "Features",    link: "#features"    },
  { name: "How It Works",link: "#how-it-works"},
  { name: "Categories",  link: "#categories"  },
  { name: "Contact",     link: "#footer"      },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/80 bg-slate-950/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav className="flex h-20 items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center" aria-label="PrepMate AI home">
            <Logo />
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  className="relative text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-white
                    after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r
                    after:from-sky-400 after:to-violet-500 after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA buttons ── */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/login">
              <button className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-800 hover:text-white hover:ring-slate-600">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-sky-400 hover:to-violet-500 hover:shadow-violet-900/50">
                Get Started →
              </button>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* ── Mobile dropdown ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          menuOpen ? "max-h-96 border-t border-slate-800/60" : "max-h-0"
        }`}
      >
        <Container>
          <div className="space-y-1 py-5">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
              >
                {item.name}
              </a>
            ))}

            <div className="flex gap-3 pt-4">
              <Link to="/login" className="flex-1">
                <button className="w-full rounded-xl py-3 text-sm font-semibold text-slate-300 ring-1 ring-slate-700 transition hover:bg-slate-800">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="flex-1">
                <button className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-violet-600 py-3 text-sm font-semibold text-white">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;