import { Hero } from "@/components/home/Hero";
import { Audience } from "@/components/home/Audience";
import { TheIdea } from "@/components/home/TheIdea";
import { Comparison } from "@/components/home/Comparison";
import { Marquee } from "@/components/home/Marquee";
import { Industries } from "@/components/home/Industries";
import { Services } from "@/components/home/Services";
import { WorkforceLifecycle } from "@/components/home/WorkforceLifecycle";
import { Payroll } from "@/components/home/Payroll";
import { Process } from "@/components/home/Process";
import { Proof } from "@/components/home/Proof";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Audience />
      <TheIdea />
      <Comparison />
      <Marquee />
      <Industries />
      <Services />
      <WorkforceLifecycle />
      <Payroll />
      <Process />
      <Proof />
      <CTA />
    </>
  );
}
