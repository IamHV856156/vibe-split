import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/signup";
import Dashboard from "@/pages/dashBoard";
import ProtectedRoute from "@/features/auth/components/protectedRoute";
export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/Login"/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            
            <Route path="/dashboard" element={
            <ProtectedRoute>
                <Dashboard/>
            </ProtectedRoute>}/>
        </Routes>
        </BrowserRouter>
    );
}