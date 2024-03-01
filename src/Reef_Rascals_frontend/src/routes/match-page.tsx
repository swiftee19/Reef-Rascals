import React, { useState } from 'react';
import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";
import { User } from '../types/user';
import { authManager } from '../types/auth';

export default function MatchPage() {

    let currUser = authManager.getCurrentUser();

    let [inGame, setInGame] = useState(true);

    let users: User[] = [];
    async function searchForMatch() : Promise<User> {
        if(currUser === null) throw new Error("User not logged in");
        users = await matchmaking.getOpponents(currUser);
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomOpponent = users[randomIndex];
        return randomOpponent;   
    }

    let i = 0;
    let userCurrRascal = 0;
    let opponentCurrRascal = 0;

    

    return (
        <>
            <div className={styles.mainContainer}>
                <SidebarNav />
            </div>
        </>
    )
}