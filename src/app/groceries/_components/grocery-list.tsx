import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

import { getGroceries } from '~/server/data/groceries';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '~/components/ui/card';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useUserId } from '~/app/groceries/_hooks/useUserId';

type GroceryListProps = {
  searchQuery?: string;
};

export default async function GroceryList({ searchQuery }: GroceryListProps) {
  const userId = useUserId();
  const groceries = await getGroceries(userId, searchQuery);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {groceries.map((grocery) => (
        <Link key={grocery.id} href={`/groceries/${grocery.id}`}>
          <Card className="transition-[colors, shadow] shadow-md duration-200 hover:border-gray-900 hover:shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <CardTitle className="text-sm font-medium">
                  {grocery.productName} {grocery.brand && `${grocery.brand}`}
                </CardTitle>
                <CardDescription className="text-xs">
                  {grocery.quantity} {grocery.unit && `${grocery.unit}`}
                </CardDescription>
                <CardDescription className="text-xs">
                  Best before {format(grocery.expirationDate, 'dd.MM.yy')}
                </CardDescription>
              </div>
              <ChevronRightIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Image
                alt={grocery.productName}
                className="m-auto h-40 w-40 rounded-lg"
                height={160}
                width={160}
                src="/placeholder.jpg"
              />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
