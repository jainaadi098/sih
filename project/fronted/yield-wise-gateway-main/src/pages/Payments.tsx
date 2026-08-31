import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, CheckCircle, Clock, Leaf, Users, Truck, MessageCircle } from "lucide-react";

export default function Payments() {
  const services = [
    {
      id: 1,
      title: "Agricultural Consultancy",
      description: "Expert guidance for crop planning, soil management, and farming techniques",
      price: "₹2,500",
      duration: "per session",
      features: [
        "Personalized crop recommendations",
        "Soil health analysis",
        "Pest and disease management",
        "Yield optimization strategies"
      ],
      icon: Users,
      popular: false
    },
    {
      id: 2,
      title: "Equipment Leasing",
      description: "Access to modern agricultural equipment and machinery",
      price: "Variable",
      duration: "per equipment",
      features: [
        "Wide range of equipment",
        "Flexible lease terms",
        "Maintenance support",
        "Training included"
      ],
      icon: Truck,
      popular: true
    },
    {
      id: 3,
      title: "Sapling & Seeds",
      description: "High-quality saplings and certified seeds for better yields",
      price: "₹500",
      duration: "per pack",
      features: [
        "Certified varieties",
        "Disease-resistant strains",
        "High germination rate",
        "Technical support"
      ],
      icon: Leaf,
      popular: false
    }
  ];

  const paymentMethods = [
    {
      name: "Credit/Debit Card",
      description: "Secure payment with Visa, MasterCard, RuPay",
      icon: CreditCard,
      supported: true
    },
    {
      name: "UPI",
      description: "Quick payment via UPI apps",
      icon: "📱",
      supported: true
    },
    {
      name: "Net Banking",
      description: "Direct bank transfer",
      icon: "🏦",
      supported: true
    },
    {
      name: "Digital Wallets",
      description: "Paytm, PhonePe, Google Pay",
      icon: "💳",
      supported: true
    }
  ];

  const handlePayment = (serviceTitle: string, price: string) => {
    // This would integrate with Supabase payment functions once connected
    alert(`Payment integration for ${serviceTitle} (${price}) will be available once Supabase is connected.`);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Secure Payments
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple and secure payment solutions for all your agricultural needs. Choose from our range of services and pay safely online.
          </p>
        </div>

        {/* Security Badge */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 bg-agricultural-green/10 text-agricultural-green px-4 py-2 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="font-medium">256-bit SSL Encrypted • PCI DSS Compliant • 100% Secure</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className={`agricultural-card relative ${
                service.popular ? "ring-2 ring-primary shadow-strong" : ""
              }`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                        <span className="text-muted-foreground">{service.duration}</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-agricultural-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  {/* Payment Button */}
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={service.popular ? "default" : "outline"}
                    onClick={() => handlePayment(service.title, service.price)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pay Securely
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Methods */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Accepted Payment Methods
            </h2>
            <p className="text-muted-foreground">
              We support all major payment methods for your convenience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="agricultural-card text-center">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">
                    {typeof method.icon === "string" ? method.icon : <CreditCard className="w-8 h-8 mx-auto text-primary" />}
                  </div>
                  <h3 className="font-semibold mb-2">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-16 bg-muted/30 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Payment Information
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  All payments are processed through encrypted channels with bank-level security
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Instant Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Payments are processed instantly and services are activated immediately
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Money Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  100% satisfaction guaranteed or get your money back within 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}