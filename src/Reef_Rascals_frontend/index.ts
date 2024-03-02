import { AuthClient } from "@dfinity/auth-client";

// One day in nanoseconds
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

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

const handleAuthenticated = async (authClient: AuthClient) => {
    console.log("authenticated");
}

const authLogin = () =>{
    
}

const init = async () => {
    // const authClient = await AuthClient.create(defaultOptions.createOptions);
    const authClient = await AuthClient.create();

    // check to see if user has previously logged in
    if (await authClient.isAuthenticated()) {
        handleAuthenticated(authClient);
    }else{
        console.log("user not authenticated");
    }
};

init();