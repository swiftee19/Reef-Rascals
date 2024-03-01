import React from 'react';
import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";
import { User } from '../types/user';

export default function MatchPage() {



    let users: User[] = [];
    async function searchForMatch() {
        users = await matchmaking.getAllUser();
        console.log(users);
    }

    searchForMatch();

    return (
        <>
            <div className={styles.mainContainer}>
                <SidebarNav />
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
            </div>
        </>
    )
}