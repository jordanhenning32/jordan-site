import { Nav } from "@/components/layout/Nav";
import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Metrics } from "@/components/sections/Metrics";
import { Timeline } from "@/components/sections/Timeline";
import { AIBuilds } from "@/components/sections/AIBuilds";
import { SkillsRadar } from "@/components/sections/SkillsRadar";
import { Validation } from "@/components/sections/Validation";
import { BattlefieldBoardroom } from "@/components/sections/BattlefieldBoardroom";
import { ThoughtLeadership } from "@/components/sections/ThoughtLeadership";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/interactive/Chatbot";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Vision />
        <Metrics />
        <Timeline />
        <AIBuilds />
        <SkillsRadar />
        <Validation />
        <BattlefieldBoardroom />
        <ThoughtLeadership />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
