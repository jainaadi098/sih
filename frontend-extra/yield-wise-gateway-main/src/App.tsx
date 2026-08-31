import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

import Home from "./pages/Home";
import LoginSelection from "./pages/LoginSelection";
import Login from "./pages/Login";
import About from "./pages/About";
import Information from "./pages/Information";
import Guide from "./pages/Guide";
import ProductionMatrix from "./pages/ProductionMatrix";
import EquipmentLease from "./pages/EquipmentLease";
import CropRecords from "./pages/CropRecords";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";
import { Chatbot } from "./components/Chatbot";

// 🔹 Import your Schemes_Page
import Schemes_Page from "./pages/Schemes_Page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSelection />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/information" element={<Information />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/production-matrix" element={<ProductionMatrix />} />
            <Route path="/equipment-lease" element={<EquipmentLease />} />
            <Route path="/crop-records" element={<CropRecords />} />
            <Route path="/payments" element={<Payments />} />

            {/* 🔹 NEW ROUTE FOR SCHEMES */}
            <Route path="/schemes" element={<Schemes_Page />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;











// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navigation } from "@/components/Navigation";
// import Home from "./pages/Home";
// import LoginSelection from "./pages/LoginSelection";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Information from "./pages/Information";
// import Guide from "./pages/Guide";
// import ProductionMatrix from "./pages/ProductionMatrix";
// import EquipmentLease from "./pages/EquipmentLease";
// import CropRecords from "./pages/CropRecords";
// import Payments from "./pages/Payments";
// import NotFound from "./pages/NotFound";
// import { Chatbot } from "./components/Chatbot";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <div className="min-h-screen bg-background">
//           <Navigation />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<LoginSelection />} />
//             <Route path="/login/:userType" element={<Login />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/information" element={<Information />} />
//             <Route path="/guide" element={<Guide />} />
//             <Route path="/production-matrix" element={<ProductionMatrix />} />
//             <Route path="/equipment-lease" element={<EquipmentLease />} />
//             <Route path="/crop-records" element={<CropRecords />} />
//             <Route path="/payments" element={<Payments />} />
//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//           <Chatbot />
//         </div>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );




// export default App;
