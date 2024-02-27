import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";

export default function MatchPage() {

    async function searchForMatch() {
        let users = await matchmaking.getAllUser();
        console.log(users);
    }

    return (
        <>
            <div className={styles.mainContainer}>
                <SidebarNav />
                <button onClick={searchForMatch}>Search</button>
            </div>
        </>
    )
}