import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { ProblemSolution } from "@/components/landing/problem-solution";
import { ProductShowcase } from "@/components/landing/product-showcase";
import { Benefits } from "@/components/landing/benefits";
import { MidCta } from "@/components/landing/mid-cta";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Integrations } from "@/components/landing/integrations";
import { Privacy } from "@/components/landing/privacy";
import { Community } from "@/components/landing/community";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { ScrollTracker } from "@/components/landing/scroll-tracker";

export default function LandingPage() {
  return (
    <main className="bg-white">
      <ScrollTracker />
      <Header />
      <Hero />
      <ProblemSolution />
      <ProductShowcase />
      <Benefits />
      <MidCta />
      <HowItWorks />
      <Integrations />
      <Privacy />
      <Community />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
