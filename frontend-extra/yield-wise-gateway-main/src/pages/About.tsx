import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Target, Award, Globe, Heart } from "lucide-react";
import krishiLogo from "@/assets/krishi-logo.png";

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Promoting eco-friendly farming practices that preserve our environment for future generations."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong agricultural communities through collaboration and knowledge sharing."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve traditional farming challenges."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Striving for the highest standards in agricultural services and support."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Contributing to global food security through enhanced agricultural productivity."
    },
    {
      icon: Heart,
      title: "Farmer First",
      description: "Putting farmers' needs and welfare at the center of everything we do."
    }
  ];

  const achievements = [
    { metric: "50,000+", label: "Farmers Supported", description: "Active users across India" },
    { metric: "15,000+", label: "Equipment Leased", description: "Modern agricultural machinery" },
    { metric: "95%", label: "Success Rate", description: "Farmer satisfaction score" },
    { metric: "35%", label: "Yield Improvement", description: "Average increase in productivity" },
    { metric: "500+", label: "Krish Visheshagya", description: "Agricultural experts on platform" },
    { metric: "28", label: "States Covered", description: "Pan-India presence" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <img 
            src={krishiLogo} 
            alt="Krishi Parinidhi Logo" 
            className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-soft"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Krishi Parinidhi
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Empowering Indian agriculture through technology, innovation, and comprehensive farmer support systems. 
            We bridge the gap between traditional farming wisdom and modern agricultural solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To transform Indian agriculture by providing farmers with access to modern technology, 
                expert guidance, and market linkages while preserving sustainable farming practices 
                and traditional agricultural wisdom.
              </p>
            </CardContent>
          </Card>

          <Card className="agricultural-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To create a digitally empowered agricultural ecosystem where every farmer has access 
                to the tools, knowledge, and support needed to achieve prosperity while contributing 
                to India's food security and economic growth.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="agricultural-card text-center">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="agricultural-card text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {achievement.metric}
                  </div>
                  <div className="font-semibold text-foreground mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="text-xl">For Farmers (Kisan)</CardTitle>
                <CardDescription>Comprehensive agricultural support system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Production Matrix</Badge>
                    <span className="text-sm text-muted-foreground">Crop insights & GPS tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Equipment Lease</Badge>
                    <span className="text-sm text-muted-foreground">Modern machinery access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Crop Records</Badge>
                    <span className="text-sm text-muted-foreground">Digital record keeping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Secure Payments</Badge>
                    <span className="text-sm text-muted-foreground">Safe transaction platform</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="text-xl">For Experts (Krish Visheshagya)</CardTitle>
                <CardDescription>Professional agricultural advisory platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Farmer Advisory</Badge>
                    <span className="text-sm text-muted-foreground">Direct farmer consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Data Analytics</Badge>
                    <span className="text-sm text-muted-foreground">Agricultural data insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Technology Guidance</Badge>
                    <span className="text-sm text-muted-foreground">Tech adoption support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Knowledge Sharing</Badge>
                    <span className="text-sm text-muted-foreground">Community collaboration</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Government Alignment */}
        <Card className="agricultural-card gradient-hero text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Aligned with National Initiatives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-semibold mb-2">PM-KISAN</div>
                <div className="text-sm text-primary-foreground/90">
                  Supporting direct benefit transfer initiatives
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Digital Agriculture Mission</div>
                <div className="text-sm text-primary-foreground/90">
                  Promoting digital farming solutions
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Sustainable Farming</div>
                <div className="text-sm text-primary-foreground/90">
                  Encouraging eco-friendly practices
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}