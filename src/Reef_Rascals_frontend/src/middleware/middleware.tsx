import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { redirect } from "react-router-dom";


export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<AuthClient | null>(null);
    const updateUser = (newUser: AuthClient | null) => {
        if (newUser) {
            setUser(newUser);
        }
    }

    let pathname = window.location.pathname
    let currentRoute = window.location.href;
    let routeSplit = currentRoute.split("?")
    let tempCanisterId = routeSplit[1];

    const guestRoutes = ['', '/', '/marketplace', '/login']

    useEffect(() => {
        console.log(pathname);

        const pathnameSplit = pathname.split('/')
        const mainPathname = pathnameSplit[1]

        console.log(pathnameSplit);
        console.log("mainPathname: " + mainPathname);
        console.log(user);

        if (!user && !guestRoutes.includes(mainPathname)) {
            console.log("redirecting...");
            window.location.href = "/?" + tempCanisterId
        }

    }, [pathname])

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}