import { Separator } from "@/components/ui/separator";
import HeroSection from "@/components/about/HeroSection";
import Story from "@/components/about/Story";
import MissionVision from "@/components/about/MissionVision";
import Values from "@/components/about/Values";
import WhyWe from "@/components/about/WhyWe";

const BizKimizPage = () => {
 return (
  <div className="min-h-screen bg-background font-sans text-foreground">

   <HeroSection />
   <Story />
   <Separator className="container mx-auto" />
   <MissionVision />
   <Values />
   <WhyWe />
  </div>
 );
};

export default BizKimizPage;