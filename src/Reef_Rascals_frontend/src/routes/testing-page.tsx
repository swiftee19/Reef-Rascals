import React from 'react';
import SidebarNav from "../components/sidebar-nav";
import { Auth, createActor, idlFactory } from "../../../declarations/Auth";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";

export default function TestingPage() {
    let actor = Auth;

    async function whoami() {
        const principal = await actor.whoami();
        console.log(principal);
    }

    async function login() {
        const authClient = await AuthClient.create();
        const identity = authClient.getIdentity();
        authClient.login({
            maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
            onSuccess: async () => {
                // await handleAuthenticated(authClient);
            },
        });
    }
    
    return (
        <>
            <div className={"main-container"}>
                <SidebarNav />
                <button onClick={whoami}>Who am I?</button>
                <button onClick={login}>Login</button>
            </div>
        </>
    );
}
