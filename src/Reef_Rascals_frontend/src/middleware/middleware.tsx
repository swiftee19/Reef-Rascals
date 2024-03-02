import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { defaultOptions } from "../../index";
import { Actor, HttpAgent } from "@dfinity/agent";

export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const localStorage = new LocalStorage();
  console.log(localStorage);

  const [user, setUser] = useState<AuthClient | null>(null);
  const updateUser = (newUser: AuthClient | null) => {
    if (newUser) {
      setUser(newUser);
    }
  };

  let pathname = window.location.pathname;
  let currentRoute = window.location.href;
  let routeSplit = currentRoute.split("?");
  let tempCanisterId = routeSplit[1];

  const guestRoutes = ["", "/", "/marketplace", "/login"];

  const login = async () => {
    const authClient = await AuthClient.create();

    authClient.login({
      // 7 days in nanoseconds
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: async () => {
        console.log("successfully logged in");
        setUser(authClient);
        
        const identity = await authClient.getIdentity();
        console.log("identity: " + identity);
        console.log("principal:" + identity.getPrincipal());

        // const actor = Actor.createActor(idlFactory, {
        //   agent: new HttpAgent({
        //     identity,
        //   }),
        //   canisterId,
        // });
      },
    });
  };

  useEffect(() => {
    const pathnameSplit = pathname.split("/");
    const mainPathname = pathnameSplit[1];

    console.log(user);

    // kalau user belum log in atau tidak terautentikasi
    if (!user || !user?.isAuthenticated) {
      // kalau user mengakses route yang tidak untuk public
      if (!guestRoutes.includes(mainPathname))
        window.location.href = "/?" + tempCanisterId;
    }
  }, [pathname, user]);

  return (
    <AuthContext.Provider value={{ user, updateUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
