import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Truck, FileText, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/ministry-agriculture.jpg";
import pmModi from "@/assets/modi-full-face.jpg";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgroundImages = [heroImage, pmModi];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BarChart3,
      title: "Production Matrix",
      description: "Explore India's diverse farming practices, crops, and innovations through our interactive matrix.",
      link: "/production-matrix",
      color: "agricultural-green"
    },
    {
      icon: Truck,
      title: "Equipment Lease",
      description: "Browse and lease modern agricultural equipment including irrigation systems and drones.",
      link: "/equipment-lease",
      color: "agricultural-wheat"
    },
    {
      icon: FileText,
      title: "Crop Records",
      description: "Access comprehensive crop production data and performance analytics.",
      link: "/crop-records",
      color: "agricultural-sky"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Safe and simple payment solutions for consultancy and equipment services.",
      link: "/payments",
      color: "agricultural-harvest"
    }
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Agricultural Insights &
            <span className="block text-accent">Innovation Platform</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Empowering farmers with cutting-edge technology, data-driven insights, and modern equipment to revolutionize Indian agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8">
              <Link to="/production-matrix">
                Explore Production Matrix <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/equipment-lease">
                Browse Equipment
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Agricultural Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From production analytics to equipment leasing, we provide everything you need to optimize your agricultural operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="agricultural-card group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="ghost" asChild className="p-0 h-auto font-medium text-primary hover:text-primary/80">
                      <Link to={feature.link}>
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Government Support for Agricultural Innovation
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
              Under visionary leadership and commitment to transforming Indian agriculture through technology, innovation, and farmer empowerment. Our platform aligns with national agricultural policies to ensure sustainable growth and prosperity for our farming community.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card">
                <div className="w-3 h-3 gradient-primary rounded-full"></div>
                <span className="text-foreground font-medium">PM-KISAN Direct Benefit Transfer</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card">
                <div className="w-3 h-3 gradient-primary rounded-full"></div>
                <span className="text-foreground font-medium">Digital Agriculture Mission</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-lg bg-card">
                <div className="w-3 h-3 gradient-primary rounded-full"></div>
                <span className="text-foreground font-medium">Sustainable Farming Initiatives</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who have improved their yield and efficiency with our platform.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8">
            <Link to="/equipment-lease">
              Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}