import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, AlertTriangle, TrendingUp, TrendingDown, Warehouse, Truck, Users, Phone } from "lucide-react";

interface CropData {
  name: string;
  production: string;
  area: string;
  states: string;
  season: string;
}

interface CropDetailsModalProps {
  crop: CropData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CropDetailsModal({ crop, isOpen, onClose }: CropDetailsModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<"country" | "state" | "local">("country");

  if (!crop) return null;

  // Mock GPS data - in real implementation, this would come from APIs
  const gpsData = {
    country: {
      totalProduction: crop.production,
      majorRegions: crop.states.split(", "),
      coordinates: [28.6139, 77.2090], // Delhi coordinates as center
      productionTrend: "increasing"
    },
    state: {
      stateName: crop.states.split(", ")[0],
      districts: ["District A", "District B", "District C"],
      productivity: "4.2 tons/hectare",
      coordinates: [28.7041, 77.1025],
      productionTrend: "stable"
    },
    local: {
      village: "Sample Village",
      coordinates: [28.7041, 77.1025],
      nearbyFarmers: 156,
      avgYield: "3.8 tons/hectare",
      productionTrend: "decreasing"
    }
  };

  // Check if crop is in overproduction
  const isOverproduced = ["Rice", "Wheat", "Sugarcane"].includes(crop.name);

  const storageOptions = [
    {
      type: "Cold Storage",
      capacity: "500-2000 tons",
      cost: "₹2-4 per kg/month",
      suitableFor: "Fruits, Vegetables",
      locations: "Urban centers"
    },
    {
      type: "Warehouse Storage",
      capacity: "1000-5000 tons",
      cost: "₹0.5-1 per kg/month",
      suitableFor: "Grains, Pulses",
      locations: "Rural & Urban"
    },
    {
      type: "Solar Drying",
      capacity: "10-100 tons",
      cost: "₹5-10 per kg",
      suitableFor: "Spices, Herbs",
      locations: "Farm level"
    }
  ];

  const overproductionSolutions = [
    {
      title: "Value Addition & Processing",
      description: "Transform surplus crops into high-value products",
      examples: "Rice → Rice flour, bran oil, rice cakes; Wheat → Pasta, bread, semolina",
      techniques: [
        "Establish mini processing units at village level",
        "Partner with food tech startups",
        "Develop organic/premium product lines",
        "Create ready-to-eat meal products"
      ]
    },
    {
      title: "Export Market Development",
      description: "Access international markets for surplus produce",
      examples: "Basmati rice to Middle East, wheat to neighboring countries",
      techniques: [
        "Register with APEDA for export assistance",
        "Form Farmer Producer Organizations (FPOs)",
        "Get organic/quality certifications",
        "Use government export promotion schemes"
      ]
    },
    {
      title: "Contract Farming & Processing",
      description: "Pre-agreed sales to processing industries",
      examples: "Contract with ITC, Britannia, Nestle for assured procurement",
      techniques: [
        "Sign buy-back agreements before sowing",
        "Negotiate fair price mechanisms",
        "Ensure quality standards compliance",
        "Reduce middleman dependency"
      ]
    },
    {
      title: "Strategic Crop Diversification",
      description: "Shift from surplus crops to deficit ones",
      examples: "Replace excess rice/wheat with pulses, oilseeds, fruits",
      techniques: [
        "Grow pulses in rice fallow land",
        "Intercropping with oilseeds",
        "Adopt horticulture in suitable areas",
        "Use climate-smart crop varieties"
      ]
    },
    {
      title: "Storage & Market Timing",
      description: "Strategic storage to sell at better prices",
      examples: "Store grains using scientific methods, sell during lean season",
      techniques: [
        "Use hermetic storage bags",
        "Build community storage facilities",
        "Monitor market prices regularly",
        "Access warehouse receipt financing"
      ]
    },
    {
      title: "Government Scheme Utilization",
      description: "Leverage existing policies for surplus management",
      examples: "PM-FME scheme, MIDH, Operation Greens",
      techniques: [
        "Apply for PM Formalization of Micro Food Processing",
        "Use Mission for Integrated Development of Horticulture",
        "Access cluster development programs",
        "Utilize marketing infrastructure schemes"
      ]
    },
    {
      title: "Technology Integration",
      description: "Use digital platforms for better market access",
      examples: "eNAM, direct consumer sales, agritech platforms",
      techniques: [
        "Register on electronic National Agriculture Market",
        "Use farm-to-fork direct selling platforms",
        "Adopt precision agriculture for quality improvement",
        "Leverage blockchain for traceability"
      ]
    },
    {
      title: "Alternative Uses & Biomass",
      description: "Convert surplus into non-food applications",
      examples: "Rice straw for packaging, wheat straw for biomass energy",
      techniques: [
        "Produce biodegradable packaging materials",
        "Supply biomass for renewable energy",
        "Create animal feed supplements",
        "Develop bio-fertilizers from crop residue"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{crop.name} Production Details</DialogTitle>
          <DialogDescription>
            Comprehensive production data and insights for {crop.name}
          </DialogDescription>
        </DialogHeader>

        {isOverproduced && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>Overproduction Alert:</strong> This crop is currently in surplus. 
              <Button 
                variant="destructive" 
                size="sm" 
                className="ml-2 h-6 px-2"
                onClick={() => setSelectedLevel("local")}
              >
                View Solutions
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="gps-data" className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="gps-data">GPS Production Data</TabsTrigger>
            <TabsTrigger value="storage">Storage Options</TabsTrigger>
            <TabsTrigger value="solutions">Overproduction Solutions</TabsTrigger>
          </TabsList>

          <TabsContent value="gps-data" className="space-y-4">
            <div className="flex space-x-2 mb-4">
              <Button
                variant={selectedLevel === "country" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("country")}
              >
                Country Level
              </Button>
              <Button
                variant={selectedLevel === "state" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("state")}
              >
                State Level
              </Button>
              <Button
                variant={selectedLevel === "local" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel("local")}
              >
                Local Level
              </Button>
            </div>

            {selectedLevel === "country" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      National Production
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Total Production:</span>
                        <div className="font-semibold text-lg">{gpsData.country.totalProduction}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Major Producing States:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {gpsData.country.majorRegions.map((region, index) => (
                            <Badge key={index} variant="secondary">{region}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Trend:</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 font-medium">Increasing</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Production Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 h-40 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>Interactive GPS Map</p>
                        <p className="text-sm">Coordinates: {gpsData.country.coordinates.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedLevel === "state" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {gpsData.state.stateName} State
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Productivity:</span>
                        <div className="font-semibold text-lg">{gpsData.state.productivity}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Major Districts:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {gpsData.state.districts.map((district, index) => (
                            <Badge key={index} variant="secondary">{district}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>District Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 h-40 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>State Level GPS Map</p>
                        <p className="text-sm">Coordinates: {gpsData.state.coordinates.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedLevel === "local" && (
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {gpsData.local.village}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Average Yield:</span>
                        <div className="font-semibold text-lg">{gpsData.local.avgYield}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Nearby Farmers:</span>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{gpsData.local.nearbyFarmers}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Local Trend:</span>
                        <div className="flex items-center gap-1">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 font-medium">Decreasing</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Local Area Map</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 h-40 rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>Village Level GPS Map</p>
                        <p className="text-sm">Coordinates: {gpsData.local.coordinates.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid gap-4">
              {storageOptions.map((option, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Warehouse className="w-5 h-5" />
                      {option.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Capacity:</span>
                        <div className="font-medium">{option.capacity}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{option.cost}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Suitable For:</span>
                        <div className="font-medium">{option.suitableFor}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Locations:</span>
                        <div className="font-medium">{option.locations}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="solutions" className="space-y-4">
            <div className="grid gap-4">
              {overproductionSolutions.map((solution, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-3">{solution.description}</p>
                    <div className="bg-muted/30 p-3 rounded-lg mb-3">
                      <span className="text-sm font-medium">Examples:</span>
                      <p className="text-sm text-muted-foreground mt-1">{solution.examples}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-800">Implementation Techniques:</span>
                      <ul className="mt-2 space-y-1">
                        {solution.techniques.map((technique, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                            <div className="w-1.5 h-1.5 gradient-primary rounded-full mt-1.5 flex-shrink-0" />
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Phone className="w-5 h-5" />
                  Need Expert Guidance?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-800 mb-3">
                  Connect with Krish Visheshagya (Agricultural Experts) for personalized solutions.
                </p>
                <Button variant="outline" className="border-orange-300 text-orange-800 hover:bg-orange-100">
                  Contact Expert
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}