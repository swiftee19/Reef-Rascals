import { useRouteError } from "react-router";
import "./scss/pages/error-page.scss";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className={"error-page"}>
            <h1>Oops!</h1>
            <p>You have traveled to unknown routes, my friend.</p>
        </div>
    );
}