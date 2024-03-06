import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {AuthClient} from "@dfinity/auth-client";
import {handleAuthenticated, localStorage} from "../../index";

export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);

const guestRoutes = ["", "/", "marketplace", "loading", "details"];
export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    // const [principal, setPrincipal] = useState<string | null>(null);
    const [principal, setPrincipal] = useState<string | null>("null");

    const getPrincipal = async (): Promise<string | null> => {
        const principal = await localStorage.get("principal");
        if (principal != null) setPrincipal(principal);
        return principal;
    }

    const login = async () => {
        const authClient = await AuthClient.create();

        await authClient.login({
            // 7 days in nanoseconds
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                await handleAuthenticated(authClient);
                console.log("successfully logged in");
            },
        });
    };

    useEffect(() => {
        if (principal == null) {
            getPrincipal().then((result) => {
                const pathname = window.location.pathname;
                const pathnameSplit = pathname.split("/");
                const mainPathname = pathnameSplit[1];

                const currentRoute = window.location.href;
                const routeSplit = currentRoute.split("?")
                const tempCanisterId = routeSplit[1];
                const canisterId = "?" + tempCanisterId

                if (result == null && !guestRoutes.includes(mainPathname)) {
                    window.location.href = "/" + canisterId;
                }
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{login, principal}}>
            {children}
        </AuthContext.Provider>
    );
};
