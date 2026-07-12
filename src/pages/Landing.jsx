import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Categories from "../components/landing/Categories";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Categories />
      <Stats />
      <CTA />
      <Footer/>
    </>
  );
};

export default Landing;