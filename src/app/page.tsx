import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Technology from "@/components/Technology";
import Values from "@/components/Values";
import Trust from "@/components/Trust";
import Engagement from "@/components/Engagement";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <Technology />
        <Values />
        <Trust />
        <Engagement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
