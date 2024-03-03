import { HttpAgent, Identity } from "@dfinity/agent";
import { AuthClient, LocalStorage } from "@dfinity/auth-client";
import { createActor } from "../declarations/matchmaking";
import { useAuthContext } from "./src/middleware/middleware";

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
  const canisterId = fullTextCanisterIdSplit[1];

  return canisterId;
};

export const handleAuthenticated = async (authClient: AuthClient) => {
  const identity = await authClient.getIdentity();
  const canisterId = getCanisterId();

  const actor = createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });

  localStorage.set("principal", identity.getPrincipal() as unknown as string)
};

const init = async () => {
  // const authClient = await AuthClient.create(defaultOptions.createOptions);
  const authClient = await AuthClient.create();

  // check to see if user has previously logged in
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  } else {
    console.log("user not authenticated");
  }
};

init();
