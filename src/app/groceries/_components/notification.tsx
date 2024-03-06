import Link from 'next/link';
import { BellIcon } from '@radix-ui/react-icons';

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative ml-4 h-8 w-8" size="icon" variant="outline">
          <BellIcon className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
          {expiredGroceries.length > 0 && (
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-400 text-xs text-white">
              {expiredGroceries.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-auto">
        {expiredGroceries.map((grocery) => (
          <Link
            key={grocery.id}
            className="text-red-400"
            href={`/groceries/${grocery.id}`}
          >
            {`${grocery.productName} ${grocery.brand}`} is expired
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}
