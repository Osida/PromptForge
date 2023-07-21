"use client"; // Error components must be Client Components

import {useEffect} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import {useRouter} from "next/navigation";

export default function Error({error, reset,}: { error: Error & { digest?: string }, reset: () => void }) {
    const router = useRouter();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className={"min-h-screen bg-base-100 flex items-center justify-center text-neutral"}>
            <section className="p-8 rounded-xl bg-neutral shadow-2xl space-y-6 text-white max-w-4xl">
                <header className="flex items-center space-x-2">
                    <AiFillCloseCircle className="h-6 w-6 text-error"/>
                    <h2 className="text-2xl font-bold">Oops! Something went wrong!</h2>
                </header>
                <article>
                    <p>{error.message}</p>
                </article>
                <nav className="flex justify-center space-x-4">
                    <button className="btn btn-primary md:btn-wide" onClick={reset}>Try Again</button>
                    <button className="btn btn-outline md:btn-wide" onClick={() => router.push("/")}>
                        Go Back Home
                    </button>
                </nav>
            </section>
        </main>
    );
}



