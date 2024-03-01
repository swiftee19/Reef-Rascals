import { matchmaking } from "../../../declarations/matchmaking";
import RascalCard from "../components/rascal-card";
import RascalRankCard from "../components/rascal-rank-card";
import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/market-page.module.scss";
import { Rarity, Rascal, RascalType } from "../types/rascal";
import rascalList from "../types/rascals";

export default function MarketPage() {

    const rascal1: Rascal = new Rascal(
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

    const rascals: Rascal[] = rascalList;

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
                    <h1 className={styles.containerHeader}>Top Selling</h1>
                    <div className={styles.topSelling}>
                        {
                            rascals.map((rascal, index) => {
                                if (index < 6) {
                                    return <RascalRankCard key={rascal.id} rascal={rascal} index={index} />
                                }
                            })
                        }
                    </div>
                </section>

                <section className={styles.recentContainer}>
                    <h1 className={styles.containerHeader}>Recent Rascals</h1>
                    <div className={styles.recentRascals}>
                        {
                            rascals.map((rascal) => {
                                return <RascalCard key={rascal.id} rascal={rascal} />
                            })
                        }
                    </div>
                </section>
            </div>
        </>
    )
}