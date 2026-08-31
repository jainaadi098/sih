import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, GraduationCap, Eye, EyeOff } from "lucide-react";
import krishiLogo from "@/assets/krishi-logo.png";
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default function Login() {
  const { userType } = useParams<{ userType: string }>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [error, setError] = useState("");

  const isExpert = userType === "expert";
  const userTitle = isExpert ? "Krishi Visheshagya" : "Kisan";
  const userIcon = isExpert ? GraduationCap : User;
  const Icon = userIcon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post<{ access_token: string; token_type: string }>(`/login/${userType}`, {
        username: formData.userId, // backend field
        password: formData.password,
      });

      // ✅ Backend JWT format: { "access_token": "xxx", "token_type": "bearer" }
      const { access_token } = res.data as { access_token: string; token_type: string };
      localStorage.setItem("token", access_token);
      localStorage.setItem("userType", userType || "farmer");

      // ✅ Redirect after login
      navigate("/crop-records");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={krishiLogo}
            alt="Krishi Parinidhi Logo"
            className="w-16 h-16 mx-auto mb-4 rounded-2xl"
          />
          <h1 className="text-3xl font-bold text-foreground">Krishi Parinidhi</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your {userTitle} account
          </p>
        </div>

        {/* Card */}
        <Card className="agricultural-card">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-center">
              {userTitle} Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your {isExpert ? "Expert" : "Kisan"} ID and password to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User ID */}
              <div className="space-y-2">
                <Label htmlFor="userId">{userTitle} ID</Label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder={`Enter your ${userTitle} ID`}
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  className="h-11"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Submit */}
              <Button type="submit" className="w-full h-11 gradient-hero font-semibold">
                Sign In
              </Button>
            </form>

            {/* Forgot password */}
            <div className="mt-6 text-center">
              <Link
                to="#"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Register info */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="#" className="text-primary hover:text-primary/80 font-medium">
                  Contact your local agriculture office
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Login Selection
          </Link>
        </div>
      </div>
    </div>
  );
}














// import { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { User, GraduationCap, Eye, EyeOff } from "lucide-react";
// import krishiLogo from "@/assets/krishi-logo.png";

// export default function Login() {
//   const { userType } = useParams<{ userType: string }>();
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     userId: "",
//     password: "",
//   });

//   const isExpert = userType === "expert";
//   const userTitle = isExpert ? "Krish Visheshagya" : "Kisan";
//   const userIcon = isExpert ? GraduationCap : User;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle login logic here (requires Supabase integration)
//     console.log("Login attempt:", formData);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const Icon = userIcon;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <img 
//             src={krishiLogo} 
//             alt="Krishi Parinidhi Logo" 
//             className="w-16 h-16 mx-auto mb-4 rounded-2xl"
//           />
//           <h1 className="text-3xl font-bold text-foreground">Krishi Parinidhi</h1>
//           <p className="text-muted-foreground mt-2">Sign in to your {userTitle} account</p>
//         </div>

//         <Card className="agricultural-card">
//           <CardHeader className="space-y-1">
//             <div className="flex items-center justify-center mb-4">
//               <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
//                 <Icon className="w-6 h-6 text-primary-foreground" />
//               </div>
//             </div>
//             <CardTitle className="text-2xl font-semibold text-center">{userTitle} Login</CardTitle>
//             <CardDescription className="text-center">
//               Enter your {isExpert ? "Expert" : "Kisan"} ID and password to access your dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="userId">{userTitle} ID</Label>
//                 <Input
//                   id="userId"
//                   name="userId"
//                   type="text"
//                   placeholder={`Enter your ${userTitle} ID`}
//                   value={formData.userId}
//                   onChange={handleChange}
//                   required
//                   className="h-11"
//                 />
//               </div>
              
//               <div className="space-y-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="h-11 pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full h-11 gradient-hero font-semibold">
//                 Sign In
//               </Button>
//             </form>

//             <div className="mt-6 text-center">
//               <Link 
//                 to="#" 
//                 className="text-sm text-primary hover:text-primary/80 font-medium"
//               >
//                 Forgot your password?
//               </Link>
//             </div>

//             <div className="mt-6 pt-6 border-t border-border text-center">
//               <p className="text-sm text-muted-foreground">
//                 Don't have an account?{" "}
//                 <Link to="#" className="text-primary hover:text-primary/80 font-medium">
//                   Contact your local agriculture office
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//           <div className="mt-6 text-center">
//             <Link 
//               to="/login" 
//               className="text-sm text-muted-foreground hover:text-foreground"
//             >
//               ← Back to Login Selection
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// }