import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, ArrowRight } from "lucide-react";
import krishiLogo from "@/assets/krishi-logo.png";

export default function LoginSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <img 
            src={krishiLogo} 
            alt="Krishi Parinidhi Logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-2xl"
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">Krishi Parinidhi</h1>
          <p className="text-muted-foreground text-lg">Choose your login type to continue</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Kisan Login */}
          <Card className="agricultural-card group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Login as Kisan</CardTitle>
              <CardDescription className="text-base">
                Access your farming dashboard, crop records, and equipment lease options
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Crop Production Tracking</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Equipment Lease Management</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Payment Solutions</span>
                </div>
              </div>
              <Button size="lg" className="w-full gradient-hero" asChild>
                <Link to="/login/kisan">
                  Continue as Kisan <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Krish Visheshagya Login */}
          <Card className="agricultural-card group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Login as Krish Visheshagya</CardTitle>
              <CardDescription className="text-base">
                Agricultural expert portal for advisory services and farmer support
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Farmer Advisory Services</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Production Analysis</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 gradient-primary rounded-full"></div>
                  <span>Technology Guidance</span>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link to="/login/expert">
                  Continue as Expert <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}