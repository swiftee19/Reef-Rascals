import { useState } from "react";
import { Rarity, Rascal, RascalType } from "../types/rascal";
import rascalList from "../types/rascal-dummy";
import RascalCard from "../components/rascal-card";
import RascalRankCard from "../components/rascal-rank-card";
import SidebarNav from "../components/sidebar-nav";
import styles from "../scss/pages/market-page.module.scss";
import Modal from "../components/modal";
import { matchmaking } from "../../../declarations/matchmaking";
import LoadingPage from "../components/loading-page";

export default function MarketPage() {
    const [search, setSearch] = useState("");
    const [sellModal, setSellModal] = useState(false);
    const [filteredRascals, setFilteredRascals] = useState<Rascal[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getRascals() {
        const rascals = await matchmaking.getMarket();
        if(rascals){
            setFilteredRascals(rascals);
            setIsLoading(false);
        } else {
            console.log("rascals not found");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value.toLowerCase();
        setSearch(searchText);

        const filtered = rascalList.filter(rascal =>
            rascal.name.toLowerCase().includes(searchText)
        );
        setFilteredRascals(filtered);
    };

    const topSelling = rascalList.slice(0, 6)

    if(isLoading) {
        getRascals();
        return <LoadingPage/>
    }

    return (
        <>
            <SidebarNav />
            <div className={styles.mainContainer}>
                <header className={styles.headerContainer}>
                    <h1>Marketplace</h1>
                    <div className={styles.rightContainer}>
                        <div className={styles.searchBar}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12">
                                <path fill="currentColor" d="M5 1a4 4 0 1 0 2.248 7.31l2.472 2.47a.75.75 0 1 0 1.06-1.06L8.31 7.248A4 4 0 0 0 5 1M2.5 5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0" />
                            </svg>
                            <input type="text" placeholder="Search Rascal..." onChange={handleChange} />
                        </div>
                        <div className={styles.sellBtn} onClick={() => setSellModal(true)}>
                            Sell
                        </div>
                        <div className={styles.myICP}>
                            <img src="/favicon.ico" alt="" />
                            <p>0.111</p>
                        </div>
                    </div>
                </header>

                <section className={styles.topContainer}>
                    <h1 className={styles.containerHeader}>Top Selling</h1>
                    <div className={styles.topSelling}>
                        {topSelling.map((rascal, index) => (
                            <RascalRankCard key={rascal.id} rascal={rascal} index={index} />
                        ))}
                    </div>
                </section>

                <section className={styles.recentContainer}>
                    <h1 className={styles.containerHeader}>Recent Rascals</h1>
                    <div className={styles.recentRascals}>
                        {filteredRascals.map((rascal) => (
                            <RascalCard key={rascal.id} rascal={rascal} />
                        ))}
                    </div>
                </section>

                { sellModal &&
                    <Modal closeModal={() => setSellModal(false)}/>
                }
            </div>

            
        </>
    );
}
