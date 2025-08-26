import type {ReactNode} from "react";
import { createContext,useContext,useState,useEffect } from "react";
import api from "../api";

type User = {
    username:string;
    email:string;
}

type AuthContextType = {
    user:User|null;
    login:(username:string,password:string)=>Promise<void>;
      register: (username: string, email: string, password: string) => Promise<void>;
    logout:()=>void
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const AuthProvider = ({children}:{children: ReactNode})=>{
    const [user,setUser] = useState<User|null>(null)

    useEffect(()=>{
        const token = localStorage.getItem("access")
        if(token){
            api.get<User>('/auth/profile/').then(res=>setUser(res.data)).catch(()=>{
                    setUser(null)
            })
        }
    },[])

    const login = async (username:string,password:string)=>{
        const res = await api.post('/auth/login/',{username,password})
        localStorage.setItem("access",res.data.access)
        localStorage.setItem("refresh",res.data.refresh)

        const profile = await api.get<User>('/auth/profile/')
        setUser(profile.data)
    }
  const register = async (username: string, email: string, password: string) => {
    await api.post('auth/register/', { username, email, password });
    await login(username, password);
  };

    const logout = ()=>{
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context)throw new Error("useAuth must be used within AuthProvider")
    return context
}






