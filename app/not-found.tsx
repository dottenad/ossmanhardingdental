import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main-content" className="flex-grow flex items-center justify-center px-4">
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-primary-600 mb-4">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-gray-600 mb-8">
                        The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <Link
                        href="/"
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition inline-block"
                    >
                        Go Back Home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
