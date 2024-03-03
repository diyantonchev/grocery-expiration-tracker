import Link from 'next/link';
import { DashboardIcon, BellIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';
import Navigation from './navigation';

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-3 font-semibold" href="#">
            <DashboardIcon className="h-6 w-6" />
            <span className="">Dashboard</span>
          </Link>
          <Button className="ml-4 h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <Navigation />
      </div>
    </div>
  );
}
