import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";
const Testimonials = () => {
  const testimonials = [{
    name: "Sarah Johnson",
    role: "Wedding Couple",
    content: "Our wedding dance was absolutely magical thanks to Maestro's guidance. He taught us not just the steps, but how to connect with each other through the dance. Our guests were amazed!",
    rating: 5,
    image: "SJ"
  }, {
    name: "Michael Rodriguez",
    role: "Advanced Student",
    content: "I've been dancing tango for 3 years now, and Maestro's classes have transformed my understanding of this beautiful art form. His passion is infectious and his teaching is world-class.",
    rating: 5,
    image: "MR"
  }, {
    name: "Elena Vasquez",
    role: "Beginner Student",
    content: "I was terrified to try tango, but Maestro made me feel so comfortable and confident. Now I can't imagine my life without this dance. Thank you for opening this world to me!",
    rating: 5,
    image: "EV"
  }, {
    name: "David Chen",
    role: "Performance Student",
    content: "Training for our showcase performance was intense but incredibly rewarding. Maestro pushed us to excellence while maintaining the joy and passion that makes tango special.",
    rating: 5,
    image: "DC"
  }, {
    name: "Isabella Martinez",
    role: "Private Lesson Student",
    content: "The personalized attention in private lessons helped me overcome my specific challenges. Maestro's patience and expertise are unmatched. Highly recommended!",
    rating: 5,
    image: "IM"
  }, {
    name: "Robert Thompson",
    role: "Corporate Workshop",
    content: "We hired Maestro for our company team-building event. It was fantastic! Everyone had a great time and we learned so much about connection and communication.",
    rating: 5,
    image: "RT"
  }];
  return <section className="py-20 px-4 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-tango bg-clip-text text-transparent">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Discover what makes the YankeeTango global community different</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="tango-glow hover:shadow-tango transition-all duration-300">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary mb-4" />
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 text-secondary fill-current" />)}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gradient-tango rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to start your own tango journey?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-tango text-white px-8 py-3 rounded-lg font-semibold hover:shadow-tango transition-all duration-300">
              Book Your First Lesson
            </button>
            <button className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Testimonials;