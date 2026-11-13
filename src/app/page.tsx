import { Hero } from "@/components/home/Hero";
import { Audience } from "@/components/home/Audience";
import { TheIdea } from "@/components/home/TheIdea";
import { Comparison } from "@/components/home/Comparison";
import { Industries } from "@/components/home/Industries";
import { Services } from "@/components/home/Services";
import { Payroll } from "@/components/home/Payroll";
import { Proof } from "@/components/home/Proof";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Audience />
      <TheIdea />
      <Comparison />
      <Industries />
      <Services />
      <Payroll />
      <Proof />
      <CTA />
    </>
  );
}
