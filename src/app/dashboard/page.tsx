import { type Metadata } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';

import { getGroceries } from '~/server/data/groceries';
import { Button } from '~/components/ui/button';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '~/components/ui/card';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import AddProductDialog from '~/app/dashboard/_components/add-product-dialog';
import { useUserId } from '~/app/dashboard/_hooks/useUserId';

export const metadata: Metadata = {
  title: 'Grocery Cards',
  description: 'A list of groceries to track',
};

export default async function DashboardHome() {
  const userId = useUserId();
  const groceries = await getGroceries(userId);

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Product Expiry</h1>
        <AddProductDialog trigger={<Button size="sm">Add product</Button>} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {groceries.map((grocery) => (
          <Card key={grocery.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <CardTitle className="text-sm font-medium">
                  {grocery.productName} {grocery.brand && `${grocery.brand}`}
                </CardTitle>
                <CardDescription className="text-xs">
                  {grocery.quantity} {grocery.unit && `${grocery.unit}`}
                </CardDescription>
                <CardDescription className="text-xs">
                  Best before {dayjs(grocery.expirationDate).format('DD.MM.YY')}
                </CardDescription>
              </div>
              <ChevronRightIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Image
                alt={grocery.productName}
                className="m-auto h-24 w-24"
                height={64}
                width={64}
                src="/placeholder.jpg"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
