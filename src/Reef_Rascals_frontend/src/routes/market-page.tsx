import { matchmaking } from "../../../declarations/matchmaking";
import RascalCard from "../components/rascal-card";
import RascalRankCard from "../components/rascal-rank-card";
import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/market-page.module.scss";
import { Rarity, Rascal, RascalType } from "../types/rascal";

export default function MarketPage() {

    const rascal1: Rascal = new Rascal(
        "#10070111730",
        "Ribble",
        2,
        "/rascals/ribble.png",
        RascalType.Fearless,
        Rarity.Common,
        20,
        10,
        30,
        "whbpg-wktkv-qm2ea-l545d-ztrdc-ekeci-r4o7y-jiobt-b54l4-534x7-lae"
    )

    const rascals: Rascal[] = []

    async function getRascals() {
        return await matchmaking.getMarket()
    }

    getRascals().then((rascals) => {
        console.log(rascals)
    })  

    

    return (
        <>
            <SidebarNav />
            <div className={styles.mainContainer}>
                <header className={styles.headerContainer}>
                    <h1>Marketplace</h1>
                    <div className={styles.searchBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 1a4 4 0 1 0 2.248 7.31l2.472 2.47a.75.75 0 1 0 1.06-1.06L8.31 7.248A4 4 0 0 0 5 1M2.5 5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"/></svg>
                        <input type="text" placeholder="Search Rascal..." />
                    </div>
                </header>

                <section className={styles.topContainer}>
                    <h1>Top Selling</h1>
                    <div className={styles.topSelling}>
                        <RascalRankCard index={0} rascal={rascal1} />
                        <RascalRankCard index={1} rascal={rascal1} />
                        <RascalRankCard index={2} rascal={rascal1} />
                        <RascalRankCard index={0} rascal={rascal1} />
                        <RascalRankCard index={0} rascal={rascal1} />
                        <RascalRankCard index={0} rascal={rascal1} />
                    </div>
                </section>

                <section className={styles.recentContainer}>
                    <h1>Recent Rascals</h1>
                    <div className={styles.recentRascals}>
                        <RascalCard rascal={rascal1} />
                        <RascalCard rascal={rascal1} />
                        <RascalCard rascal={rascal1} />
                        <RascalCard rascal={rascal1} />
                        <RascalCard rascal={rascal1} />
                        <RascalCard rascal={rascal1} />
                    </div>
                </section>
            </div>
        </>
    )
}