import React, {useState} from 'react';
import {matchmaking} from "../../../declarations/matchmaking";
import styles from "../scss/pages/match-page.module.scss";
import {User} from '../types/user';
import {authManager} from '../types/auth';
import MatchCanvas from "../components/match-canvas";
import {Rascal} from "../types/rascal";
import HealthStats from '../components/health-stats';
import {FightingRascals} from '../components/fighting-rascals';
import {useParams} from 'react-router';
import LoadingPage from '../components/loading-page';
import BattleResultModal from '../components/battle-result-modal';
import {useAuthContext} from '../middleware/middleware';
import {Principal} from '@dfinity/principal';

export default function MatchPage() {
    const params = useParams();
    const opponentId = params.opponentId
    const userId = useAuthContext().principal
    const [defender, setDefender] = useState<User>({} as User);
    const [attacker, setAttacker] = useState<User>({} as User);
    const [battleEnded, setBattleEnded] = useState<string | null>('');
    const [userCurrRascal, setUserCurrRascal] = useState<Rascal | null>(null);
    const [opponentCurrRascal, setOpponentCurrRascal] = useState<Rascal | null>(null);
    const [userMax, setUserMax] = useState<number>();
    const [opponentMax, setOpponentMax] = useState<number>();
    const [userHealth, setUserHealth] = useState<number>(0);
    const [opponentHealth, setOpponentHealth] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    async function setUp() {
        if (userId && opponentId) {
            const data = await matchmaking.getUser(Principal.fromText(userId));
            const data1 = await matchmaking.getUser(Principal.fromText(opponentId!));
            if (data && data1) {
                setAttacker(data[0]);
                setDefender(data1[0]);
                
                setUserCurrRascal(data[0].rascals.at(0)!);
                setUserMax(Number(data[0].rascals.at(0)!.health));
                setUserHealth(Number(data[0].rascals.at(0)!.health));

                setOpponentCurrRascal(data1[0].defense.at(0)!);
                setOpponentMax(Number(data1[0].defense.at(0)!.health));
                setOpponentHealth(Number(data1[0].defense.at(0)!.health));
                setIsLoading(false);
            } else {
                console.log("No data");
            }
        }
    }

    const changeUserHealth = (health: number) => {
        setUserHealth(health);
        console.log("User health", health);
    }
    const changeOpponentHealth = (health: number) => {
        setOpponentHealth(health);
        console.log("Opponent health", health);
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

    if (isLoading) {
        setUp();
        return <LoadingPage/>
    }

    return (
        <div className={styles.pageContainer}>
            <img className={styles.bgBack} src={"/bg-brawl-sea.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-bottom.png"} alt={"image not found"}/>
            <img className={styles.bgFront} src={"/bg-brawl-top.png"} alt={"image not found"}/>
            {attacker && <>
                <div className={styles.mainContainer}>
                    <MatchCanvas player={attacker} opponent={defender} changeUserHealth={changeUserHealth}
                                 changeOpponentHealth={changeOpponentHealth}
                                 changeOpponentCurrRascal={changeOpponentCurrRascal}
                                 changeUserCurrRascal={changeUserCurrRascal} battleEnd={battleEnded}
                                 setBattleEnd={battleEndedHandler}/>
                </div>
                <div className={styles.topPart}>
                    <HealthStats progress={userHealth} maximum={userMax!}/>
                    <HealthStats progress={opponentHealth} maximum={opponentMax!} isFlipped={true}/>
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