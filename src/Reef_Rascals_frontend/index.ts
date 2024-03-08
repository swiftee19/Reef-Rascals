import {AuthClient, LocalStorage} from "@dfinity/auth-client";
import {createActor, matchmaking} from "../declarations/matchmaking";
import { User } from "./src/types/user";
import rascalList from "./src/types/rascal-dummy";

// One day in nanoseconds
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const localStorage: LocalStorage = new LocalStorage();

export const defaultOptions = {
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://localhost:4943?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai#authorize`,
    // Maximum authorization expiration is 8 days
    maxTimeToLive: days * hours * nanoseconds,
  },
};

export const getCanisterId = (): string => {
  let currentRoute = window.location.href;
  let routeSplit = currentRoute.split("?");
  let fullTextCanisterId = routeSplit[1];
  const fullTextCanisterIdSplit = fullTextCanisterId.split("=");
  return fullTextCanisterIdSplit[1];
};

export const handleAuthenticated = async (authClient: AuthClient) => {
  const identity = authClient.getIdentity();

  const principal = identity.getPrincipal();
  const result = await matchmaking.getUser(principal);

  if (result.length === 1) {
    const user: User = result[0];
    console.log(user);
    const now = new Date().getTime();
    const lastClaim = new Date(user.lastRasletClaim).getTime();
    const diff = now - lastClaim;
    const raslet = Math.floor(diff / (1000 * 10 * 60));
    user.raslet = BigInt(raslet);
    if (raslet > 0 && user.raslet < 7) {
      const x = await matchmaking.getRaslet(principal, BigInt(raslet),new Date().toString());
      if(x){
        console.log("raslet already claimed")
      }else {
        console.log("failed claiming raslet")
      }
    }
  } else {
    const user = new User(principal);
    matchmaking.register(user);
    console.log("user created");
  }

  await localStorage.set("principal", principal as unknown as string)
};

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    await handleAuthenticated(authClient);
  } else {
    await localStorage.remove("principal")
    console.log("user not authenticated");
  }
};

init();
