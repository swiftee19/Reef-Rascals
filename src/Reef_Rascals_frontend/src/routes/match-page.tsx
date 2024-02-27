import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking"

export default function MatchPage() {

    function searchForMatch() {
        let users = matchmaking.getAllUser();
        console.log(users);
    }

    return (
        <>
            <div className={"main-container"}>
                <SidebarNav />
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
                <button onClick={searchForMatch}>Search</button>
            </div>
        </>
    )
}