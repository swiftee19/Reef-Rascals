import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { handleAuthenticated } from "../../index";
import { _SERVICE } from "../../../declarations/matchmaking/matchmaking.did";

export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthClient | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);

  const updateUser = async (newUser: AuthClient) => {
    let updatedUser: AuthClient;

    if (newUser) {
      updatedUser = newUser;
      setUser(updatedUser);
    }
  };

  let pathname = window.location.pathname;
  let currentRoute = window.location.href;
  let routeSplit = currentRoute.split("?");
  let tempCanisterId = routeSplit[1];

  const guestRoutes = ["", "/", "marketplace"];

  const login = async () => {
    const authClient = await AuthClient.create();

    authClient.login({
      // 7 days in nanoseconds
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: async () => {
        handleAuthenticated(authClient);
        console.log("successfully logged in");
        updateUser(authClient);
      },
    });
  };

  useEffect(() => {
    const principal = localStorage.getItem("ic-principal");
    if (principal) setPrincipal(principal);
  }, []);

  useEffect(() => {
    // const pathnameSplit = pathname.split("/");
    // const mainPathname = pathnameSplit[1];

    // console.log(user);

    // // kalau user belum log in atau tidak terautentikasi
    // if (!user || !user?.isAuthenticated) {
    //   // kalau user mengakses route yang tidak untuk public
    //   if (!guestRoutes.includes(mainPathname))
    //     window.location.href = "/?" + tempCanisterId;
    // }
  }, [pathname, user]);

  return (
    <AuthContext.Provider value={{ login, principal }}>
      {children}
    </AuthContext.Provider>
  );
};
