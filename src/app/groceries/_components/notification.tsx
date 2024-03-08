import Link from 'next/link';
import { BellIcon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import { getExpiredGroceries } from '~/server/data/groceries';
import { useUserId } from '~/app/groceries/_hooks/useUserId';

export default async function Notification() {
  const userId = useUserId();
  const expiredGroceries = await getExpiredGroceries(userId);
  const expiredGroceriesCount = expiredGroceries.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative ml-4 h-8 w-8" size="icon" variant="outline">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          {expiredGroceriesCount > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {expiredGroceriesCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-auto p-2">
        {expiredGroceriesCount > 0 ? (
          <div className="grid gap-1">
            {expiredGroceries.map((grocery) => (
              <Link key={grocery.id} href={`/groceries/${grocery.id}`}>
                <div className="grid grid-cols-[25px_1fr] items-start rounded-md p-2 transition-colors hover:bg-gray-100">
                  <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-red-500" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">{`${grocery.productName} ${grocery.brand}`}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expired on{' '}
                      {dayjs(grocery.expirationDate).format('dddd DD MMMM YY')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <span>No new notifications</span>
        )}
      </PopoverContent>
    </Popover>
  );
}
