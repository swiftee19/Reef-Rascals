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

const guestRoutes = ["", "/", "loading"];
export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [principal, setPrincipal] = useState<string | null>(null);
    // const [principal, setPrincipal] = useState<string | null>("null");

    const getPrincipal = async (): Promise<string | null> => {
        const principal = await localStorage.get("principal");
        if (principal != null) setPrincipal(principal);
        return principal;
    }

    const login = async () => {
        const authClient = await AuthClient.create();

        await authClient.login({
            // 7 days in nanoseconds
            maxTimeToLive: BigInt(100 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                await handleAuthenticated(authClient);
                console.log("successfully logged in");
                window.location.reload()
            },
            onError: (err) => {
                console.error(err);
            },
        });
    };

    const onLogoutSuccess = async () => {
        await localStorage.remove("principal")
        setPrincipal(null)

        const currentRoute = window.location.href;
        const routeSplit = currentRoute.split("?")
        const tempCanisterId = routeSplit[1];
        const canisterId = "?" + tempCanisterId

        window.location.href = "/" + canisterId;
    }

    const logout = async () => {
        const authClient = await AuthClient.create();

        await authClient.logout()
        onLogoutSuccess()
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
                    login().then(() => {
                        window.location.href = "/" + canisterId
                    });
                }
            })
        }
    }, []);

    return (
        <AuthContext.Provider value={{login, logout, principal}}>
            {children}
        </AuthContext.Provider>
    );
};
