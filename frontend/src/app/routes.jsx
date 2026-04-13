import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/signup";
import Dashboard from "@/pages/dashBoard";
import ProtectedRoute from "@/features/auth/components/protectedRoute";
import JoinGroup from "@/pages/joinGroup";
import OnBoarding from "@/pages/onBoarding";
import AppLayout from "@/components/layout/appLayout";
import GroupDetails from "@/features/groups/pages/groupDetail";
import GroupList from "@/features/groups/pages/groupList";

export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            {/* Public */}
            <Route path="/" element={<Navigate to="/Login"/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/onboarding" element={<OnBoarding/>}/>
            <Route path="/join" element={<JoinGroup/>}/>
            {/* Protected Layout */}
            <Route element={<ProtectedRoute/>}>
            <Route element={<AppLayout/>}>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/groups" element={<GroupList/>}/>
            <Route path="/group/:id" element={<GroupDetails/>}/>
            </Route>
            </Route>
        </Routes>
        </BrowserRouter>
    );
}; 