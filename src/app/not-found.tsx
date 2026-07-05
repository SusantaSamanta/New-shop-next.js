import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-green-600">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Link href="/" className="mt-8">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
}