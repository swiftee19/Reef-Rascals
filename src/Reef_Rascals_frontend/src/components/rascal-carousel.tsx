import { useEffect } from 'react';
import styles from '../scss/components/rascal-carousel.module.scss'

const rascalsList = [
    { name: 'Circus Clio', image: '/rascals/circus-clio.png' },
    { name: 'Finbite', image: '/rascals/captain-finbite.png' },
    { name: 'Gloomy Bob', image: '/rascals/gloomy-bob.png' },
    { name: 'King Octo', image: '/rascals/king-octo.png' },
    { name: 'Ribble', image: '/rascals/ribble.png' },
    { name: 'Marina Showlion', image: '/rascals/marina-showlion.png' },
    { name: 'Twinkler', image: '/rascals/twinkler.png' },
    { name: 'Axolberry', image: '/rascals/axolberry.png' },
    { name: 'Party Spine', image: '/rascals/party-spine.png' },
    { name: 'Snooze Puff', image: '/rascals/snooze-puff.png' },
];

export default function RascalCarousel({speed, flip}: {speed: number, flip: boolean}) {

    const rascals = rascalsList;

    return (
        <div className={styles.carouselContainer}>
            <div className={`${styles.carouselTrack} ${flip ? styles.flip : ''}`} style={{ animationDuration: `${speed}s` }}>                {
                    rascalsList.map((rascal, index) => {
                        return (
                            <div key={index} className={`${styles.carouselSlide} `}>
                                <img src={rascal.image} alt={rascal.name} />
                                <p>{rascal.name}</p>
                            </div>
                        )
                    })
                }
                {
                    rascalsList.map((rascal, index) => {
                        return (
                            <div key={index} className={styles.carouselSlide}>
                                <img src={rascal.image} alt={rascal.name} />
                                <p>{rascal.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}