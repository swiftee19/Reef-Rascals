import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";


export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<AuthClient | null>(null);
    const updateUser = (newUser: AuthClient | null) => {
        if (newUser) {
            setUser(newUser);
        }
    }

    

    useEffect(()=>{
        
    }, [])

    return (
        <AuthContext.Provider value={{user, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}