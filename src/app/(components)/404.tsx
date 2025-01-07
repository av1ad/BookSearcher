import Link from "next/link";


export default function ErrorMessage() {
    return (
        <div className="h-screen content-center">
            <h1 className="text-red-800 text-4xl">404</h1>
            <p>Uh oh! Looks like this page doesnt seem to show any books...</p>
            <Link href="/" className="underline">Go back home</Link>
        </div>
    )
}