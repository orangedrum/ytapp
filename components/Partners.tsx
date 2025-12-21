import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Music, MapPin } from "lucide-react";
const Partners = () => {
  // Editable partners list - modify as needed
  const partners = [{
    name: "FreeBrain",
    type: "Wellness Partner",
    description: "Innovative mind-body wellness partnership combining tango with neuroscience-based practices.",
    location: "www.freebrain.me",
    icon: <Award className="h-8 w-8" />,
    website: "www.freebrain.me"
  }];
  return <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6 text-foreground">
            Our Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We collaborate with the finest tango institutions internationally to provide you with authentic experiences and opportunities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => <Card key={index} className="tango-glow hover:shadow-tango transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-primary">
                    {partner.icon}
                  </div>
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {partner.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {partner.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{partner.location}</span>
                  </div>
                  
                  <a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:text-primary-glow transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">Visit</span>
                  </a>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-elegance rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-thin mb-4 text-foreground">
              Interested in Partnership?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're always looking to collaborate with organizations that share our 
              passion for authentic Argentine tango culture and education.
            </p>
            <Button variant="tango" size="lg" className="whitespace-normal h-auto py-3">
              Contact Us About Partnership
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Partners;