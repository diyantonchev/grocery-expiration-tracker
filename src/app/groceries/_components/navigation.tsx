'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '~/lib/utils';
import { LineChartIcon } from '~/components/icons';
import { TableIcon, HomeIcon } from '@radix-ui/react-icons';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex-1 overflow-auto py-4">
      <nav className="grid items-start px-2 text-sm font-medium">
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900  dark:text-gray-50 dark:hover:text-gray-50',
            pathname === '/groceries' &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800',
          )}
          href="/groceries"
        >
          <HomeIcon className="h-4 w-4" />
          Home
        </Link>
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
            pathname === '/groceries/table' &&
              'bg-gray-100 text-gray-900 dark:bg-gray-800',
          )}
          href="/groceries/table"
        >
          <TableIcon className="h-4 w-4" />
          Table
        </Link>
        <Link
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
            pathname === '/groceries/insights' &&
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
