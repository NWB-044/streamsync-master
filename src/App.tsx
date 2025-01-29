import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { AdminAuth } from "./components/AdminAuth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? <>{children}</> : <Navigate to="/admin-auth" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Index />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;