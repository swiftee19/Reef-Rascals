import "../scss/components/sidebar.scss";

export default function Sidebar() {
    return (
        <>
            <div className="sidebar">
                <div className={"button"}>
                    <img src={"/icon-home.png"} />
                    <h3>Home</h3>
                </div>
                <div className={"button"}>
                    <img src={"/icon-market.png"} />
                    <h3>Marketplace</h3>
                </div>
                <div className={"button"}>
                    <img src={"/icon-fish.png"} />
                    <h3>Aquarium</h3>
                </div>
                <div className={"button"}>
                    <img src={"/icon-profile.png"} />
                    <h3>Profile</h3>
                </div>
            </div>
        </>
    )
}