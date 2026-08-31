import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  GraduationCap, 
  BarChart3, 
  Truck, 
  FileText, 
  CreditCard, 
  MapPin, 
  AlertTriangle, 
  Warehouse,
  Phone,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Guide() {
  const kisanSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Login with your Kisan ID to access personalized features",
      icon: User,
      action: "Go to Login",
      link: "/login"
    },
    {
      step: 2,
      title: "Explore Production Matrix",
      description: "View crop data, GPS tracking, and overproduction alerts",
      icon: BarChart3,
      action: "View Matrix",
      link: "/production-matrix"
    },
    {
      step: 3,
      title: "Lease Equipment",
      description: "Browse and lease modern agricultural machinery",
      icon: Truck,
      action: "Browse Equipment",
      link: "/equipment-lease"
    },
    {
      step: 4,
      title: "Manage Crop Records",
      description: "Maintain digital records of your farming activities",
      icon: FileText,
      action: "View Records",
      link: "/crop-records"
    },
    {
      step: 5,
      title: "Secure Payments",
      description: "Make safe payments for services and equipment",
      icon: CreditCard,
      action: "Payment Options",
      link: "/payments"
    }
  ];

  const expertSteps = [
    {
      step: 1,
      title: "Expert Registration",
      description: "Register as Krish Visheshagya with your credentials",
      icon: GraduationCap,
      action: "Register Now",
      link: "/login"
    },
    {
      step: 2,
      title: "Farmer Consultation",
      description: "Provide advisory services to farmers in your area",
      icon: Phone,
      action: "Start Consulting",
      link: "/information"
    },
    {
      step: 3,
      title: "Production Analysis",
      description: "Analyze crop data and provide insights",
      icon: BarChart3,
      action: "View Data",
      link: "/production-matrix"
    },
    {
      step: 4,
      title: "Technology Guidance",
      description: "Help farmers adopt modern agricultural technologies",
      icon: Truck,
      action: "Learn More",
      link: "/equipment-lease"
    }
  ];

  const features = [
    {
      feature: "GPS Crop Tracking",
      description: "Track crop production at country, state, and local levels using GPS coordinates",
      benefits: ["Real-time production data", "Location-based insights", "Trend analysis"],
      howTo: "Click on any crop in the Production Matrix to view detailed GPS data and trends."
    },
    {
      feature: "Overproduction Alerts",
      description: "Get warned when crops are in surplus with actionable solutions",
      benefits: ["Early warning system", "Solution recommendations", "Market guidance"],
      howTo: "Red alerts appear on overproduced crops with direct access to storage and selling options."
    },
    {
      feature: "Storage Solutions",
      description: "Find appropriate storage options based on your crop and location",
      benefits: ["Cost-effective storage", "Quality preservation", "Local availability"],
      howTo: "Access storage options through crop details or equipment lease section."
    },
    {
      feature: "Expert Consultation",
      description: "Connect with Krish Visheshagya for personalized agricultural advice",
      benefits: ["Professional guidance", "Customized solutions", "Ongoing support"],
      howTo: "Book consultations through the information section or crop detail modals."
    }
  ];

  const faqs = [
    {
      question: "How do I access GPS crop data?",
      answer: "Click on any crop card in the Production Matrix. You'll see detailed GPS data at country, state, and local levels with interactive maps and production trends."
    },
    {
      question: "What should I do if my crop shows overproduction alert?",
      answer: "Click the red alert button to access storage solutions, value addition options, export opportunities, and diversification strategies specific to your crop and location."
    },
    {
      question: "How can I lease agricultural equipment?",
      answer: "Visit the Equipment Lease section, browse available machinery, check availability in your area, and complete the leasing process through our secure payment system."
    },
    {
      question: "How do I connect with agricultural experts?",
      answer: "Access the Information section or click 'Contact Expert' in crop details. You can book consultations with Krish Visheshagya based on your specific needs and location."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways. All transactions are processed safely through our verified payment partners."
    },
    {
      question: "Can I track my farming records digitally?",
      answer: "Yes, use the Crop Records section to maintain digital records of your farming activities, including planting schedules, yields, expenses, and income tracking."
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            User Guide
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete guide to using Krishi Parinidhi platform effectively. Learn how to maximize your agricultural productivity with our tools and services.
          </p>
        </div>

        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="tutorials">Step-by-Step</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Getting Started */}
          <TabsContent value="getting-started" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="agricultural-card">
                <CardHeader>
                  <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center mb-4">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">For Farmers (Kisan)</CardTitle>
                  <CardDescription>
                    Access production data, lease equipment, and manage your farming operations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {kisanSteps.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step.title}</div>
                          <div className="text-sm text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                    ))}
                    <Button asChild className="w-full mt-4">
                      <Link to="/login">Get Started as Kisan</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="agricultural-card">
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">For Experts (Krish Visheshagya)</CardTitle>
                  <CardDescription>
                    Provide advisory services and support to farmers in your region
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expertSteps.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{step.title}</div>
                          <div className="text-sm text-muted-foreground">{step.description}</div>
                        </div>
                      </div>
                    ))}
                    <Button variant="secondary" asChild className="w-full mt-4">
                      <Link to="/login">Join as Expert</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Key Features */}
          <TabsContent value="features" className="space-y-6">
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.feature}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">Benefits:</h4>
                        <ul className="space-y-2">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-primary">How to Use:</h4>
                        <p className="text-sm text-muted-foreground">{feature.howTo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Step-by-Step Tutorials */}
          <TabsContent value="tutorials" className="space-y-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">For Farmers (Kisan)</h3>
                <div className="grid gap-4">
                  {kisanSteps.map((step, index) => (
                    <Card key={index} className="agricultural-card">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">Step {step.step}</Badge>
                              <h4 className="font-semibold">{step.title}</h4>
                            </div>
                            <p className="text-muted-foreground mb-3">{step.description}</p>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={step.link}>
                                {step.action} <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">For Experts (Krish Visheshagya)</h3>
                <div className="grid gap-4">
                  {expertSteps.map((step, index) => (
                    <Card key={index} className="agricultural-card">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                            <step.icon className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">Step {step.step}</Badge>
                              <h4 className="font-semibold">{step.title}</h4>
                            </div>
                            <p className="text-muted-foreground mb-3">{step.description}</p>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={step.link}>
                                {step.action} <ArrowRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="agricultural-card gradient-hero text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Can't find what you're looking for? Connect with our Krish Visheshagya experts for personalized assistance.
                </p>
                <Button variant="secondary" asChild>
                  <Link to="/information">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}