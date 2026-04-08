import { BrowserRouter,Routes,Route } from "react-router-dom";
import login from "../features/auth/pages/login";
import Signup from "../features/auth/pages/signup";
export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/login" element={<login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
        </BrowserRouter>
    );
}