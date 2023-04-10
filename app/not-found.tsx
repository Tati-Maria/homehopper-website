import Link from "next/link";

export default function NotFound() {
    return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/">
        <a className="text-indigo-500 hover:underline">Go back home</a>
      </Link>
    </div>
    )
}