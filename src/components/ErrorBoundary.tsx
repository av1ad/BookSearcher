import { Link } from "react-router-dom";

export default function ErrorBoundary() {
    return (
        <div className="h-screen content-center">
            <h1 className="text-red-800 text-4xl">404</h1>
            <p>Uh oh! Looks like this page doesn't seem to show any books...</p>
            <Link to="/" className="underline">Go back home</Link>
        </div>
    )
}