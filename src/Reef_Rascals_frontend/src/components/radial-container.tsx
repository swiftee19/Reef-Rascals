import {ReactNode} from "react";
import "../scss/components/radial-container.scss";

export default function RadialContainer(children: ReactNode){
    return(
        <>
            <div className={"radial-container"}>
                {children}
            </div>
        </>
    )
}