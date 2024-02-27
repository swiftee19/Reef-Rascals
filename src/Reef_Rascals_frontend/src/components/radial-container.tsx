import React, {ReactNode} from "react";
import styles from "../scss/components/radial-container.module.scss";

interface RadialContainerProps {
    children: ReactNode;
    width?: number;
}

export default function RadialContainer(value: RadialContainerProps) {

    if(value.width) {
        return (
            <div className={styles.radialContainer} style={{width: `${value.width}%`}}>
                {value.children}
            </div>
        );
    }

    return (
        <div className={styles.radialContainer}>
            {value.children}
        </div>
    );
}
