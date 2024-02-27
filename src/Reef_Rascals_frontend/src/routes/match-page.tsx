import SidebarNav from "../components/sidebar-nav";
import match from "../../../declarations/matchmaking"

export default function MatchPage() {

    function searchForMatch() {
        let users = match.matchmaking.getAllUser();
        console.log(users);
    }

    return (
        <>
            <div className={"main-container"}>
                <SidebarNav />
                <button onClick={searchForMatch}>Search</button>
            </div>
        </>
    )
}