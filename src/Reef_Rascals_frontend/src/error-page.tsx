import { useRouteError } from "react-router";
import "./scss/pages/error-page.scss";
import {useEffect, useState} from "react";

export default function ErrorPage() {
    // const error = useRouteError();
    // console.error(error);

    const [canisterId, setCanisterId] = useState("")

    useEffect(() => {
        const currentRoute = window.location.href;
        // console.log(currentRoute)
        const routeSplit = currentRoute.split("?")
        // console.log(routeSplit)
        const tempCanisterId = routeSplit[1];
        setCanisterId("?"+tempCanisterId)
    }, []);

    return (
        <div id="error-page" className={"error-page"}>
            <h1>Oops!</h1>
            <p>You have traveled to unknown routes, my friend.</p>
            <p>But don't worry, I'll guide you back to safety.</p>
            <a href={"/" + canisterId}>Go back to safety</a>
        </div>
    );
}