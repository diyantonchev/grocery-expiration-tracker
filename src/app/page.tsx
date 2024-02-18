import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="w-full py-12">
      <div className="container flex flex-col items-center justify-center space-y-3 px-4 text-center md:space-y-5 md:px-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            Grocery Expiration Tracker
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Keep track of your groceries expiration dates with ease.
          </p>
        </div>
        <Link
          className="inline-flex h-11 items-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
          href="/dashboard"
        >
          Get Started
        </Link>
        <div className="w-full max-w-3xl">
          <Image
            className="aspect-[2/1] overflow-hidden rounded-lg border object-cover object-center"
            alt="Hero"
            src="/groceries.jpeg"
            height="450"
            width="900"
          />
        </div>
      </div>
    </main>
  );
}
