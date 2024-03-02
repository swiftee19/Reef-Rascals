import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthClient } from "@dfinity/auth-client";
import { defaultOptions } from "../../index";

export const AuthContext = createContext<any>(null);
export const useAuthContext = () => useContext(AuthContext);


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
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
    const authClient = await AuthClient.create(defaultOptions.createOptions);
    authClient.login({
      // 7 days in nanoseconds
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      onSuccess: async () => {
        console.log("successfully logged in");
        setUser(authClient)
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
