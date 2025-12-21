import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Heart } from "lucide-react";
import tangoHero from "@/assets/tango-hero.jpg";
import { WaitlistDialog } from "@/components/WaitlistDialog";

const Hero = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url(/lovable-uploads/b5459f68-34ba-405e-8d36-ef1073685515.png)`
    }}>
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 md:pt-0">
        <div className="max-w-4xl mx-auto minimal-entrance">
          <h1 className="text-6xl md:text-8xl font-light mb-6 text-foreground tracking-tight">Yankee Tango</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-light">Grow your Argentine Tango without a partner with expertly designed curriculum for busy schedules</p>
          
          <div className="flex flex-col gap-4 justify-center items-center mb-12">
            <WaitlistDialog 
              open={waitlistOpen} 
              onOpenChange={setWaitlistOpen}
              trigger={
                <Button variant="tango" size="lg" className="group min-h-[44px]">
                  Join YankeeTango
                </Button>
              }
            />
            <a href="https://calendly.com/jean-kaluza/virtual-tango-lesson" className="text-foreground hover:text-primary transition-colors underline">
              Book a Lesson
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center minimal-float">
              <div className="text-3xl font-light text-primary mb-2">15+</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Years Experience</div>
            </div>
            <div className="text-center minimal-float" style={{
            animationDelay: "0.5s"
          }}>
              <div className="text-3xl font-light text-primary mb-2">10/10</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">would recommend</div>
            </div>
            <div className="text-center minimal-float" style={{
            animationDelay: "1s"
          }}>
              <div className="text-3xl font-light text-primary mb-2">99.8%</div>
              <div className="text-muted-foreground text-sm uppercase tracking-wide">Satisfaction</div>
            </div>
          </div>
          
          {/* View Testimonials Link */}
          <div className="mt-8 mb-8 md:mb-0 text-center">
            <Heart className="h-5 w-5 text-primary mx-auto mb-2" />
            <a href="#testimonials" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide underline">
              View all testimonials
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;