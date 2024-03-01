import { User } from "./user";

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
