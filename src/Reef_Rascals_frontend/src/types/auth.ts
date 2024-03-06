import {Principal} from "@dfinity/principal";
import {matchmaking} from "../../../declarations/matchmaking";
import {User} from "./user";
import {useAuthContext} from "../middleware/middleware";
import {LocalStorage} from "@dfinity/auth-client";
import {localStorage} from "../../index";

class AuthManager {
    private static instance: AuthManager;
    private currentUser: User | null;

    private constructor() {
        this.currentUser = null;
    }

    public static getInstance(): AuthManager {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }
        return AuthManager.instance;
    }

    public setCurrentUser(user: User) {
        this.currentUser = user;
    }

    public getCurrentUser(): User | null {
        return this.currentUser;
    }

    public logout() {
        this.currentUser = null;
    }
}

export const authManager = AuthManager.getInstance();

export async function getCurrentUser() {
    const principalFromLocalStorage = await localStorage.get("principal");
    if (principalFromLocalStorage != null) {
        const principal = Principal.fromText(principalFromLocalStorage);
        const result = await matchmaking.getUser(principal);

        if (result.length === 1) {
            const user: User = result[0];
            return user;
        } else {
            console.log("Result is empty");
            return null;
        }
    }
}