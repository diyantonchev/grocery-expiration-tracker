import Link from 'next/link';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '~/components/ui/typewriter-effect';

const words = [
  {
    text: 'Keep',
  },
  {
    text: 'track',
  },
  {
    text: 'of',
  },
  {
    text: 'your',
  },
  {
    text: 'groceries',
  },
  {
    text: 'expiration',
  },
  {
    text: 'dates',
  },
  {
    text: 'with',
  },
  {
    text: 'ease.',
  },
];

export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-center space-y-4 px-4 text-center md:px-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
          Grocery Expiration Tracker
        </h1>
        <TypewriterEffectSmooth
          className="my-0 justify-center"
          defaultWordsClassName="text-gray-500 lg:text-2xl/relaxed font-semibold md:text-xl/relaxed"
          words={words}
        />
      </div>
      <Link
        className="inline-flex h-11 items-center rounded-md border border-gray-200 px-8 text-lg font-semibold shadow-sm transition-colors duration-300 hover:bg-blue-600 hover:text-white"
        href="/dashboard"
      >
        Get Started
      </Link>
      <div className="max-w-3xl">
        <Image
          className="aspect-[2/1] overflow-hidden rounded-lg border object-cover object-center"
          alt="Hero"
          src="/groceries.jpeg"
          height="450"
          width="900"
        />
      </div>
    </main>
  );
}
