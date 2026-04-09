import {createContext,useContext,useEffect, useState} from "react";
import { supabase } from "@/services/supabaseClient";

const authContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        supabase.auth.getUser().then(({data})=>{setUser(data.user);
            setLoading(false);
        });


        const {data:listner} = supabase.auth.onAuthStateChange((_, session)=>{
            setUser(session?.user || null);
        });

        return () => listner.subscription.unsubscribe();
    },[]);
    return(
        <authContext.Provider value={{user}}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth =() => useContext(authContext);