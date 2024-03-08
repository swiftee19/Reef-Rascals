import React, {useState} from 'react';
import SidebarNav from "../components/sidebar-nav";
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";
import {League, User} from '../types/user';
import {authManager} from '../types/auth';
import MatchCanvas from "../components/match-canvas";
import {Rarity, Rascal, RascalType} from "../types/rascal";
import {Principal} from "@dfinity/principal";
import {BattleHistory, BattleResult} from "../types/battle-history";
import rascalList from '../types/rascal-dummy';
import HealthStats from '../components/health-stats';
import {FightingRascals} from '../components/fighting-rascals';
import {useParams} from 'react-router';
import LoadingPage from '../components/loading-page';
import BattleResultModal from '../components/battle-result-modal';

export default function MatchPage() {
    const params = useParams();
    const opponentId = params.opponentId
    const [defender, setDefender] = useState<User>({} as User);
    const [attacker, setAttacker] = useState<User>({} as User);
    const [isLoading, setIsLoading] = useState(true);

    async function getDefender() {
        const data = await matchmaking.getUser(Principal.fromText(opponentId as string));
        if(data) {
            setDefender(data[0]);
            setIsLoading(false);
        } 
    }

    async function getAttacker() {
        const data = await matchmaking.getUser(authManager.getCurrentUser()!.id);
        if(data) {
            setAttacker(data[0]);
            setIsLoading(false);
        }
    }

    let currUser = authManager.getCurrentUser();

    if (isLoading) {
        getDefender();
        getAttacker();
        return <LoadingPage/>
    }

    const [battleEnded, setBattleEnded] = useState<string | null>('');

    const [userCurrRascal, setUserCurrRascal] = useState<Rascal | null>(attacker.rascals.at(0)!);
    const [opponentCurrRascal, setOpponentCurrRascal] = useState<Rascal | null>(defender.defense.at(0)!);
    const [userMax, setUserMax] = useState<number>(Number(userCurrRascal!.health));
    const [opponentMax, setOpponentMax] = useState<number>(Number(opponentCurrRascal!.health));
    const [userHealth, setUserHealth] = useState<number>(Number(userCurrRascal!.health));
    const [opponentHealth, setOpponentHealth] = useState<number>(Number(opponentCurrRascal!.health));

    const changeUserHealth = (health: number) => {
        setUserHealth(health);
    }
    const changeOpponentHealth = (health: number) => {
        setOpponentHealth(health);
    }
    const changeUserCurrRascal = (rascal: Rascal) => {
        setUserCurrRascal(rascal);
        setUserMax(Number(rascal.health));
    }
    const changeOpponentCurrRascal = (rascal: Rascal) => {
        setOpponentCurrRascal(rascal);
        setOpponentMax(Number(rascal.health));
    }
    const battleEndedHandler = (status: string) => {
        setBattleEnded(status);
    }

    return (
        <div className={styles.pageContainer}>
            <img className={styles.bgBack} src={"/bg-brawl-sea.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-bottom.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-top.png"} alt={"image not found"}/>
            {currUser && <>
                <div className={styles.mainContainer}>

                    <MatchCanvas player={currUser} opponent={defender} changeUserHealth={changeUserHealth}
                                 changeOpponentHealth={changeOpponentHealth}
                                 changeOpponentCurrRascal={changeOpponentCurrRascal}
                                 changeUserCurrRascal={changeUserCurrRascal} battleEnd={battleEnded}
                                 setBattleEnd={battleEndedHandler}/>

                </div>
                <div className={styles.topPart}>
                    <HealthStats progress={userHealth} maximum={userMax}/>
                    <HealthStats progress={opponentHealth} maximum={opponentMax} isFlipped={true}/>
                </div>
                <div className={styles.bottomPart}>
                    <FightingRascals rascals={attacker.rascals} currRascal={userCurrRascal!}/>
                    <FightingRascals rascals={defender.defense} isFlipped={true} currRascal={opponentCurrRascal!}/>
                </div>
                {battleEnded !== '' &&
                    <BattleResultModal rascals={attacker.rascals} battleEnd={battleEnded}
                                       closeModal={() => setBattleEnded('')}/>
                }
            </>}
        </div>
    )
}