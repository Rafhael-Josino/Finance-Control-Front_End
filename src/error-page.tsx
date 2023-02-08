import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return <div>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.status}</i>
                </p>
            </div>
    }

    else return <div>Unknown error - see console :(</div>

}

export default ErrorBoundary;