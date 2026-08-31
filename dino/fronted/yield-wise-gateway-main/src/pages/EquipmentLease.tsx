import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Filter, Calendar, MapPin, Truck, Droplets, Zap, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EquipmentLease() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();

  const equipment = [
    {
      id: 1,
      name: "Drip Irrigation System",
      category: "irrigation",
      description: "Advanced micro-irrigation system for water conservation",
      dailyRate: 1200,
      weeklyRate: 7500,
      monthlyRate: 28000,
      availability: "Available",
      location: "Punjab",
      features: ["Water saving up to 60%", "Automated controls", "Fertilizer injection"],
      icon: Droplets,
      image: "🌊"
    },
    {
      id: 2,
      name: "Agricultural Drone",
      category: "monitoring",
      description: "Professional drone for crop monitoring and spraying",
      dailyRate: 1500,
      weeklyRate: 9500,
      monthlyRate: 35000,
      availability: "Available",
      location: "Haryana",
      features: ["4K camera", "GPS navigation", "Pesticide spraying capability"],
      icon: Camera,
      image: "🚁"
    },
    {
      id: 3,
      name: "Greenhouse Kit",
      category: "infrastructure",
      description: "Climate-controlled greenhouse for year-round farming",
      dailyRate: 1000,
      weeklyRate: 6500,
      monthlyRate: 24000,
      availability: "Available",
      location: "Maharashtra",
      features: ["Temperature control", "UV protection", "Ventilation system"],
      icon: Zap,
      image: "🏠"
    },
    {
      id: 4,
      name: "Tractor with Implements",
      category: "machinery",
      description: "45HP tractor with plowing and seeding attachments",
      dailyRate: 1300,
      weeklyRate: 8200,
      monthlyRate: 30000,
      availability: "Booked",
      location: "Uttar Pradesh",
      features: ["45HP engine", "Multiple attachments", "Fuel efficient"],
      icon: Truck,
      image: "🚜"
    },
    {
      id: 5,
      name: "Soil Health Kit",
      category: "testing",
      description: "Professional soil testing and analysis equipment",
      dailyRate: 1100,
      weeklyRate: 7000,
      monthlyRate: 26000,
      availability: "Available",
      location: "Gujarat",
      features: ["pH testing", "Nutrient analysis", "Digital reports"],
      icon: Zap,
      image: "🔬"
    },
    {
      id: 6,
      name: "Harvesting Combine",
      category: "machinery",
      description: "Self-propelled combine harvester for cereals",
      dailyRate: 1400,
      weeklyRate: 8800,
      monthlyRate: 32000,
      availability: "Available",
      location: "Karnataka",
      features: ["Multi-crop capability", "GPS guided", "High efficiency"],
      icon: Truck,
      image: "🌾"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "irrigation", label: "Irrigation Systems" },
    { value: "monitoring", label: "Monitoring & Drones" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "machinery", label: "Machinery" },
    { value: "testing", label: "Testing Equipment" }
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleBooking = (equipmentName: string) => {
    toast({
      title: "Booking Request Submitted",
      description: `Your request for ${equipmentName} has been submitted. We'll contact you soon!`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Equipment Lease
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access modern agricultural equipment and technology through our flexible leasing options. From irrigation systems to drones, find everything you need to modernize your farm.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="text-muted-foreground w-4 h-4" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="agricultural-card">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={item.availability === "Available" ? "default" : "secondary"}>
                          {item.availability}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Pricing */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-semibold text-primary">₹{item.dailyRate}</div>
                      <div className="text-muted-foreground">Daily</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-semibold text-primary">₹{item.weeklyRate}</div>
                      <div className="text-muted-foreground">Weekly</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="font-semibold text-primary">₹{item.monthlyRate}</div>
                      <div className="text-muted-foreground">Monthly</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Key Features:</span>
                    <ul className="mt-1 space-y-1">
                      {item.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 gradient-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Now Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        disabled={item.availability !== "Available"}
                        variant={item.availability === "Available" ? "default" : "secondary"}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        {item.availability === "Available" ? "Book Now" : "Currently Booked"}
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book {item.name}</DialogTitle>
                        <DialogDescription>
                          Fill out the details below to request this equipment.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="duration">Lease Duration</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily (₹{item.dailyRate})</SelectItem>
                              <SelectItem value="weekly">Weekly (₹{item.weeklyRate})</SelectItem>
                              <SelectItem value="monthly">Monthly (₹{item.monthlyRate})</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="date">Start Date</Label>
                          <Input type="date" id="date" />
                        </div>
                        
                        <div>
                          <Label htmlFor="requirements">Special Requirements</Label>
                          <Textarea 
                            id="requirements" 
                            placeholder="Any specific requirements or questions..."
                            className="resize-none"
                            rows={3}
                          />
                        </div>
                        
                        <Button 
                          onClick={() => handleBooking(item.name)}
                          className="w-full"
                        >
                          Submit Booking Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No equipment found matching your criteria</div>
            <Button onClick={() => { setSearchTerm(""); setCategoryFilter("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}