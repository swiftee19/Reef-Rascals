import RascalCard from "../components/rascal-card";
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
        Rarity.Rare,
        20,
        10,
        30
    )

    return (
        <>
            <SidebarNav />
            <div className={styles.mainContainer}>
                <header className={styles.headerContainer}>
                    <h2>Marketplace</h2>
                    <div className={styles.searchBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 1a4 4 0 1 0 2.248 7.31l2.472 2.47a.75.75 0 1 0 1.06-1.06L8.31 7.248A4 4 0 0 0 5 1M2.5 5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"/></svg>
                        <input type="text" placeholder="Search Rascal..." />
                    </div>
                </header>

                <section className={styles.topSelling}>
                    <h2>Top Selling</h2>

                </section>

                <section className={styles.recentRascals}>
                    <RascalCard rascal={rascal1} />
                    <RascalCard rascal={rascal1} />
                    <RascalCard rascal={rascal1} />
                    <RascalCard rascal={rascal1} />
                    <RascalCard rascal={rascal1} />
                </section>
            </div>
        </>
    )
}