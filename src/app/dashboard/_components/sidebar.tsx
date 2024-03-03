import Link from 'next/link';

import { Button } from '~/components/ui/button';
import {
  HomeIcon,
  PackageIcon,
  LineChartIcon,
  Package2Icon,
  BellIcon,
} from '~/components/icons';

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4">
          <Link className="flex items-center gap-3 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">Dashboard</span>
          </Link>
          <Button className="ml-4 h-8 w-8" size="icon" variant="outline">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/dashboard"
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="/dashboard/table-view"
            >
              <PackageIcon className="h-4 w-4" />
              Table View
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <LineChartIcon className="h-4 w-4" />
              Insights
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
