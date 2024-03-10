import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import {
  CounterClockwiseClockIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';

import { Input } from '~/components/ui/input';
import BurgerMenu from './burger-menu';

export default function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40">
      <BurgerMenu />
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
              placeholder="Search groceries..."
              type="search"
            />
          </div>
        </form>
      </div>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
