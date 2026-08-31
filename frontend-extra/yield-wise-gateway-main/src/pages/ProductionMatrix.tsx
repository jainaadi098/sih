import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Wheat, Cpu, Building, AlertTriangle } from "lucide-react";
import { CropDetailsModal } from "@/components/CropDetailsModal";
import { getCurrentFarmer, getCropRecords } from "@/lib/api";

export default function ProductionMatrix() {
  const [farmer, setFarmer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cropData, setCropData] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCropClick = (crop: any) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch logged-in farmer profile
        const farmerProfile = await getCurrentFarmer();
        setFarmer(farmerProfile);

        // 2️⃣ Fetch crop records, technology & policies
        const crops = await getCropRecords("2024", "all"); // backend API
        setCropData(crops);
      } catch (err) {
        console.error(err);
        alert("Please login to access the dashboard");
        window.location.href = "/login/farmer";
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  // Default to empty arrays if backend response missing any key
  const farmingTypes = cropData?.farmingTypes || [];
  const majorCrops = cropData?.crops || [];
  const technologies = cropData?.technology || [];
  const policies = cropData?.policies || [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome, {farmer.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Production Matrix and Dashboard overview
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="crops" className="space-y-8">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
            <TabsTrigger value="farming-types" className="flex items-center gap-2">
              <Leaf className="w-4 h-4" /> Farming Types
            </TabsTrigger>
            <TabsTrigger value="crops" className="flex items-center gap-2">
              <Wheat className="w-4 h-4" /> Major Crops
            </TabsTrigger>
            <TabsTrigger value="technology" className="flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Technology
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <Building className="w-4 h-4" /> Policies
            </TabsTrigger>
          </TabsList>

          {/* Farming Types */}
          <TabsContent value="farming-types" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {farmingTypes.map((type: any, idx: number) => (
                <Card key={idx} className="agricultural-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{type.name}</CardTitle>
                        <Badge variant="secondary">{type.prevalence}</Badge>
                      </div>
                    </div>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.characteristics.map((char: string, i: number) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 gradient-primary rounded-full" />
                          {char}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Major Crops */}
          <TabsContent value="crops" className="space-y-6">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {majorCrops.map((crop: any, index: number) => {
                const isOverproduced = ["Rice", "Wheat", "Sugarcane"].includes(crop.name);
                return (
                  <Card key={index} className="agricultural-card cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => handleCropClick(crop)}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          {crop.name}
                          {isOverproduced && <AlertTriangle className="w-4 h-4 text-red-500" />}
                        </span>
                        <Badge variant={crop.season === "Annual" ? "default" : "secondary"}>
                          {crop.season || "Seasonal"}
                        </Badge>
                      </CardTitle>
                      {isOverproduced && <Badge variant="destructive" className="w-fit">Overproduced</Badge>}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Production:</span>
                          <div className="font-semibold text-primary">{crop.production}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Area:</span>
                          <div className="font-semibold text-primary">{crop.area}</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">Major States:</span>
                        <div className="font-medium text-sm mt-1">{crop.states}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4">
                        View GPS Data & Storage Options
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Technology */}
          <TabsContent value="technology" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {technologies.map((tech: any, index: number) => {
                const Icon = tech.icon || Cpu;
                return (
                  <Card key={index} className="agricultural-card">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{tech.name}</CardTitle>
                      </div>
                      <CardDescription>{tech.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className="font-semibold text-primary">{tech.adoption}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Coverage:</span>
                          <div className="font-semibold text-primary">{tech.coverage}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Policies */}
          <TabsContent value="policies" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {policies.map((policy: any, index: number) => (
                <Card key={index} className="agricultural-card">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{policy.name}</CardTitle>
                      <Badge variant={policy.status === "Active" ? "default" : "secondary"}>
                        {policy.status}
                      </Badge>
                    </div>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground text-sm">Benefit:</span>
                        <div className="font-semibold text-primary">{policy.benefit}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-sm">Coverage:</span>
                        <div className="font-medium text-sm">{policy.coverage}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <CropDetailsModal crop={selectedCrop} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}










// import { useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Leaf, Wheat, Cpu, Building, AlertTriangle } from "lucide-react";
// import { CropDetailsModal } from "@/components/CropDetailsModal";

// export default function ProductionMatrix() {
//   const [selectedCrop, setSelectedCrop] = useState<typeof majorCrops[0] | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleCropClick = (crop: typeof majorCrops[0]) => {
//     setSelectedCrop(crop);
//     setIsModalOpen(true);
//   };

//   const farmingTypes = [
//     {
//       name: "Subsistence Farming",
//       description: "Small-scale farming primarily for family consumption",
//       characteristics: ["Small land holdings", "Traditional methods", "Limited market access"],
//       prevalence: "60% of Indian farmers",
//       icon: "🏡"
//     },
//     {
//       name: "Commercial Farming",
//       description: "Large-scale production for market sale",
//       characteristics: ["Mechanized operations", "High yield varieties", "Market-oriented"],
//       prevalence: "25% of agricultural land",
//       icon: "🏭"
//     },
//     {
//       name: "Organic Farming",
//       description: "Sustainable farming without synthetic inputs",
//       characteristics: ["Natural fertilizers", "Biological pest control", "Certified produce"],
//       prevalence: "Growing at 25% annually",
//       icon: "🌱"
//     },
//     {
//       name: "Sustainable Farming",
//       description: "Environmentally conscious agricultural practices",
//       characteristics: ["Resource conservation", "Biodiversity preservation", "Climate resilience"],
//       prevalence: "15% adoption rate",
//       icon: "♻️"
//     }
//   ];

//   const majorCrops = [
//     { name: "Rice", production: "118 MT", area: "44 Mha", states: "West Bengal, UP, Punjab", season: "Kharif/Rabi" },
//     { name: "Wheat", production: "109 MT", area: "30 Mha", states: "UP, Punjab, Haryana", season: "Rabi" },
//     { name: "Pulses", production: "25 MT", area: "29 Mha", states: "MP, Maharashtra, Karnataka", season: "Kharif/Rabi" },
//     { name: "Oilseeds", production: "36 MT", area: "26 Mha", states: "Gujarat, MP, Rajasthan", season: "Kharif/Rabi" },
//     { name: "Sugarcane", production: "405 MT", area: "5 Mha", states: "UP, Maharashtra, Karnataka", season: "Annual" },
//     { name: "Cotton", production: "35 MT", area: "13 Mha", states: "Gujarat, Maharashtra, Telangana", season: "Kharif" }
//   ];

//   const technologies = [
//     {
//       name: "Drip Irrigation",
//       description: "Water-efficient irrigation system",
//       adoption: "65% increase in yield",
//       coverage: "10 Mha area covered",
//       icon: Leaf
//     },
//     {
//       name: "Precision Farming",
//       description: "Data-driven crop management",
//       adoption: "30% cost reduction",
//       coverage: "2 Mha area covered",
//       icon: Cpu
//     },
//     {
//       name: "Agricultural Drones",
//       description: "Aerial monitoring and spraying",
//       adoption: "50% time saving",
//       coverage: "5 Lakh farmers using",
//       icon: Cpu
//     },
//     {
//       name: "Digital Platforms",
//       description: "Market linkage and advisory",
//       adoption: "40% better prices",
//       coverage: "1 Crore farmers registered",
//       icon: Building
//     }
//   ];

//   const policies = [
//     {
//       name: "PM-KISAN",
//       description: "Income support scheme",
//       benefit: "₹6,000 per farmer per year",
//       coverage: "11 Crore beneficiaries",
//       status: "Active"
//     },
//     {
//       name: "RKVY",
//       description: "Rashtriya Krishi Vikas Yojana",
//       benefit: "Infrastructure development",
//       coverage: "All states covered",
//       status: "Active"
//     },
//     {
//       name: "MSP",
//       description: "Minimum Support Price",
//       benefit: "Guaranteed prices for 23 crops",
//       coverage: "Pan-India procurement",
//       status: "Active"
//     },
//     {
//       name: "Subsidies",
//       description: "Input cost reduction",
//       benefit: "50% subsidy on equipment",
//       coverage: "All eligible farmers",
//       status: "Active"
//     }
//   ];

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-foreground mb-4">
//             Production Matrix
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Comprehensive overview of India's diverse farming practices, major crops, innovative technologies, and supportive government policies.
//           </p>
//         </div>

//         {/* Tabs for different categories */}
//         <Tabs defaultValue="farming-types" className="space-y-8">
//           <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
//             <TabsTrigger value="farming-types" className="flex items-center gap-2">
//               <Leaf className="w-4 h-4" />
//               Farming Types
//             </TabsTrigger>
//             <TabsTrigger value="crops" className="flex items-center gap-2">
//               <Wheat className="w-4 h-4" />
//               Major Crops
//             </TabsTrigger>
//             <TabsTrigger value="technology" className="flex items-center gap-2">
//               <Cpu className="w-4 h-4" />
//               Technology
//             </TabsTrigger>
//             <TabsTrigger value="policies" className="flex items-center gap-2">
//               <Building className="w-4 h-4" />
//               Policies
//             </TabsTrigger>
//           </TabsList>

//           {/* Farming Types Tab */}
//           <TabsContent value="farming-types" className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {farmingTypes.map((type, index) => (
//                 <Card key={index} className="agricultural-card">
//                   <CardHeader>
//                     <div className="flex items-center gap-3 mb-2">
//                       <span className="text-2xl">{type.icon}</span>
//                       <div>
//                         <CardTitle className="text-xl">{type.name}</CardTitle>
//                         <Badge variant="secondary">{type.prevalence}</Badge>
//                       </div>
//                     </div>
//                     <CardDescription>{type.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <ul className="space-y-2">
//                       {type.characteristics.map((char, i) => (
//                         <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
//                           <div className="w-1.5 h-1.5 gradient-primary rounded-full" />
//                           {char}
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Major Crops Tab */}
//           <TabsContent value="crops" className="space-y-6">
//             <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
//               {majorCrops.map((crop, index) => {
//                 const isOverproduced = ["Rice", "Wheat", "Sugarcane"].includes(crop.name);
//                 return (
//                   <Card 
//                     key={index} 
//                     className="agricultural-card cursor-pointer hover:shadow-lg transition-all duration-300" 
//                     onClick={() => handleCropClick(crop)}
//                   >
//                     <CardHeader>
//                       <CardTitle className="flex items-center justify-between">
//                         <span className="flex items-center gap-2">
//                           {crop.name}
//                           {isOverproduced && (
//                             <AlertTriangle className="w-4 h-4 text-red-500" />
//                           )}
//                         </span>
//                         <Badge variant={crop.season === "Annual" ? "default" : "secondary"}>
//                           {crop.season}
//                         </Badge>
//                       </CardTitle>
//                       {isOverproduced && (
//                         <Badge variant="destructive" className="w-fit">
//                           Overproduced
//                         </Badge>
//                       )}
//                     </CardHeader>
//                     <CardContent className="space-y-3">
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <span className="text-muted-foreground">Production:</span>
//                           <div className="font-semibold text-primary">{crop.production}</div>
//                         </div>
//                         <div>
//                           <span className="text-muted-foreground">Area:</span>
//                           <div className="font-semibold text-primary">{crop.area}</div>
//                         </div>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground text-sm">Major States:</span>
//                         <div className="font-medium text-sm mt-1">{crop.states}</div>
//                       </div>
//                       <Button variant="ghost" size="sm" className="w-full mt-4">
//                         View GPS Data & Storage Options
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </TabsContent>

//           {/* Technology Tab */}
//           <TabsContent value="technology" className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {technologies.map((tech, index) => {
//                 const Icon = tech.icon;
//                 return (
//                   <Card key={index} className="agricultural-card">
//                     <CardHeader>
//                       <div className="flex items-center gap-3 mb-2">
//                         <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
//                           <Icon className="w-5 h-5 text-primary-foreground" />
//                         </div>
//                         <CardTitle className="text-xl">{tech.name}</CardTitle>
//                       </div>
//                       <CardDescription>{tech.description}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <span className="text-muted-foreground">Impact:</span>
//                           <div className="font-semibold text-primary">{tech.adoption}</div>
//                         </div>
//                         <div>
//                           <span className="text-muted-foreground">Coverage:</span>
//                           <div className="font-semibold text-primary">{tech.coverage}</div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>
//           </TabsContent>

//           {/* Policies Tab */}
//           <TabsContent value="policies" className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               {policies.map((policy, index) => (
//                 <Card key={index} className="agricultural-card">
//                   <CardHeader>
//                     <div className="flex items-center justify-between mb-2">
//                       <CardTitle className="text-xl">{policy.name}</CardTitle>
//                       <Badge variant={policy.status === "Active" ? "default" : "secondary"}>
//                         {policy.status}
//                       </Badge>
//                     </div>
//                     <CardDescription>{policy.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-3">
//                       <div>
//                         <span className="text-muted-foreground text-sm">Benefit:</span>
//                         <div className="font-semibold text-primary">{policy.benefit}</div>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground text-sm">Coverage:</span>
//                         <div className="font-medium text-sm">{policy.coverage}</div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>

//         <CropDetailsModal 
//           crop={selectedCrop}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </div>
//     </div>
//   );
// }