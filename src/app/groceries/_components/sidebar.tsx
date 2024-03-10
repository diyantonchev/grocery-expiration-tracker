import Link from 'next/link';
import { LapTimerIcon } from '@radix-ui/react-icons';

import Navigation from './navigation';
import Notification from './notification';

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link
            className="flex items-center gap-3 font-semibold"
            href="/groceries"
          >
            <LapTimerIcon className="h-6 w-6" />
            <span className="">Tracker</span>
          </Link>
          <Notification />
        </div>
        <Navigation />
      </div>
    </div>
  );
}
