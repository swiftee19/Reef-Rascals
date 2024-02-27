import React from 'react';
import SidebarNav from "../components/sidebar-nav";
import { Auth, createActor } from "../../../declarations/Auth";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

export default function TestingPage() {
    let actor = Auth;

    async function whoami() {
        const principal = await actor.whoami();
        console.log(principal);
    }

    async function login() {
        let authClient = await AuthClient.create();
    }

    return (
        <>
            <div className={"main-container"}>
                <SidebarNav />
                <button onClick={whoami}>Who am I?</button>
                <button onClick={login}>Login</button> {/* Call the login function on button click */}
            </div>
        </>
    );
}
