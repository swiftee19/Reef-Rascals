import React, { ReactNode } from "react";
import "../scss/components/radial-container.scss";

interface RadialContainerProps {
    children: ReactNode;
}

export default function RadialContainer({ children }: RadialContainerProps) {
    return (
        <div className={"radial-container"}>
            {children}
        </div>
    );
}
