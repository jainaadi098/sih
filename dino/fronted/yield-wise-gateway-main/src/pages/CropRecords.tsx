import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Calendar, MapPin, Award, AlertCircle, Leaf } from "lucide-react";

export default function CropRecords() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedState, setSelectedState] = useState("all");

  const newProductionData = [
    {
      crop: "Indo-Israel Avocado",
      location: "Maharashtra",
      yield: "45 tons/hectare",
      growth: "+230%",
      status: "Success Story",
      farmer: "Ramesh Kumar",
      technology: "Drip irrigation + Precision farming",
      investment: "₹12 lakhs/hectare",
      roi: "340% in 3 years",
      icon: "🥑",
      trend: "up"
    },
    {
      crop: "Dragon Fruit",
      location: "Gujarat",
      yield: "35 tons/hectare",
      growth: "+180%",
      status: "Expanding",
      farmer: "Priya Patel",
      technology: "Greenhouse cultivation",
      investment: "₹8 lakhs/hectare",
      roi: "250% in 2 years",
      icon: "🐲",
      trend: "up"
    },
    {
      crop: "Organic Quinoa",
      location: "Rajasthan",
      yield: "2.5 tons/hectare",
      growth: "+120%",
      status: "Pilot Success",
      farmer: "Suresh Singh",
      technology: "Organic farming + Water conservation",
      investment: "₹3 lakhs/hectare",
      roi: "180% in 1 year",
      icon: "🌾",
      trend: "up"
    },
    {
      crop: "Blueberry",
      location: "Himachal Pradesh",
      yield: "8 tons/hectare",
      growth: "+200%",
      status: "Export Quality",
      farmer: "Anjali Sharma",
      technology: "Controlled environment agriculture",
      investment: "₹15 lakhs/hectare",
      roi: "280% in 2 years",
      icon: "🫐",
      trend: "up"
    }
  ];

  const historicalData = [
    {
      year: "2023",
      totalProduction: "332.79 MT",
      productivity: "2,574 kg/hectare",
      cropped: "195.4 Mha",
      highlights: [
        "Record wheat production of 112.9 MT",
        "Pulses production increased by 8.5%",
        "Oilseeds reached 41.4 MT",
        "Horticulture crops: 355.48 MT"
      ]
    },
    {
      year: "2022",
      totalProduction: "315.74 MT",
      productivity: "2,468 kg/hectare",
      cropped: "197.8 Mha",
      highlights: [
        "Rice production: 130.3 MT",
        "Cotton production increased by 12%",
        "Sugarcane: 431.8 MT",
        "Spices production: 10.9 MT"
      ]
    },
    {
      year: "2021",
      totalProduction: "308.65 MT",
      productivity: "2,396 kg/hectare",
      cropped: "199.5 Mha",
      highlights: [
        "Foodgrains: 315.7 MT",
        "Horticulture: 334.6 MT",
        "Milk production: 221.1 MT",
        "Fish production: 16.2 MT"
      ]
    }
  ];

  const cropPerformance = [
    { crop: "Rice", current: "129.5 MT", target: "135 MT", performance: 96, trend: "stable" },
    { crop: "Wheat", current: "112.9 MT", target: "115 MT", performance: 98, trend: "up" },
    { crop: "Pulses", current: "27.3 MT", target: "30 MT", performance: 91, trend: "up" },
    { crop: "Oilseeds", current: "41.4 MT", target: "45 MT", performance: 92, trend: "up" },
    { crop: "Cotton", current: "34.9 MB", target: "36 MB", performance: 97, trend: "up" },
    { crop: "Sugarcane", current: "431.8 MT", target: "420 MT", performance: 103, trend: "up" }
  ];

  const states = [
    { value: "all", label: "All States" },
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "delhi", label: "Delhi" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "jammu-kashmir", label: "Jammu & Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "puducherry", label: "Puducherry" },
    { value: "andaman-nicobar", label: "Andaman & Nicobar Islands" },
    { value: "lakshadweep", label: "Lakshadweep" }
  ];

  const years = ["2024", "2023", "2022", "2021", "2020"];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Crop Production Records
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive production data, success stories, and performance analytics to track agricultural progress and innovations across India.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="new-production" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="new-production">New Production</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* New Production Tab */}
          <TabsContent value="new-production" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Latest Success Stories</h2>
              <p className="text-muted-foreground">Innovative crops and breakthrough farming achievements</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {newProductionData.map((item, index) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{item.crop}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="default" className="bg-agricultural-green">
                            {item.status}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-agricultural-green">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">{item.growth}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Yield:</span>
                        <div className="font-semibold text-primary">{item.yield}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">ROI:</span>
                        <div className="font-semibold text-agricultural-green">{item.roi}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Farmer:</span>
                      <div className="font-medium">{item.farmer}</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Technology Used:</span>
                      <div className="font-medium text-sm">{item.technology}</div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground text-sm">Investment:</span>
                      <div className="font-semibold text-primary">{item.investment}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Historical Data Tab */}
          <TabsContent value="historical" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Historical Production Records</h2>
              <p className="text-muted-foreground">Year-over-year agricultural production data and trends</p>
            </div>
            
            <div className="space-y-6">
              {historicalData.map((yearData, index) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{yearData.year} Production Summary</CardTitle>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {yearData.totalProduction}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{yearData.totalProduction}</div>
                        <div className="text-sm text-muted-foreground">Total Production</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{yearData.productivity}</div>
                        <div className="text-sm text-muted-foreground">Productivity</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{yearData.cropped}</div>
                        <div className="text-sm text-muted-foreground">Area Cropped</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-agricultural-green" />
                        Key Highlights
                      </h4>
                      <ul className="space-y-2">
                        {yearData.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 gradient-primary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Crop Performance Analysis</h2>
              <p className="text-muted-foreground">Current production vs targets and performance metrics</p>
            </div>
            
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {cropPerformance.map((crop, index) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{crop.crop}</CardTitle>
                      <div className="flex items-center gap-1">
                        {crop.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-agricultural-green" />
                        ) : crop.trend === "down" ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-agricultural-wheat" />
                        )}
                        <span className={`text-sm font-medium ${
                          crop.performance >= 100 ? "text-agricultural-green" :
                          crop.performance >= 90 ? "text-agricultural-wheat" : "text-red-500"
                        }`}>
                          {crop.performance}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current</span>
                        <span className="font-semibold">{crop.current}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Target</span>
                        <span className="font-semibold">{crop.target}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performance</span>
                        <span className={`font-semibold ${
                          crop.performance >= 100 ? "text-agricultural-green" :
                          crop.performance >= 90 ? "text-agricultural-wheat" : "text-red-500"
                        }`}>
                          {crop.performance}%
                        </span>
                      </div>
                      <Progress 
                        value={crop.performance} 
                        className="h-2"
                      />
                    </div>
                    
                    {crop.performance < 90 && (
                      <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                        <AlertCircle className="w-4 h-4" />
                        <span>Below target - needs attention</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}