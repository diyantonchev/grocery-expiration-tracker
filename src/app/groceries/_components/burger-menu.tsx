import Link from 'next/link';
import { LapTimerIcon } from '@radix-ui/react-icons';

import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { MenuIcon } from '~/components/icons';
import Navigation from './navigation';

export default function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className="block h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="pl-2 pt-4">
        <Link
          className="flex items-center gap-3 pl-2 font-semibold"
          href="/groceries"
        >
          <LapTimerIcon className="h-6 w-6" />
          <span className="">Tracker</span>
        </Link>
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
