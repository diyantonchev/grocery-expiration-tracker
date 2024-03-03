'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';
import { LineChartIcon } from '~/components/icons';
import { TableIcon, HomeIcon } from '@radix-ui/react-icons';

export default function Sidebar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-2 text-sm font-medium">
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50',
            pathname === '/dashboard' &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800',
          )}
          href="/dashboard"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
            pathname === '/dashboard/table-view' &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800',
          )}
          href="/dashboard/table-view"
        >
          <TableIcon className="h-4 w-4" />
          Table View
        </Link>
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
            pathname === '/dashboard/insights' &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800',
          )}
          href="#"
        >
          <LineChartIcon className="h-4 w-4" />
          Insights
        </Link>
      </nav>
    </div>
  );
}
