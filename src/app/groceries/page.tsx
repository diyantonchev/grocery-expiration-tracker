import { type Metadata } from 'next';
import { Suspense } from 'react';

import { Button } from '~/components/ui/button';
import AddProductDialog from '~/app/groceries/_components/add-product-dialog';
import GroceryList from '~/app/groceries/_components/grocery-list';
import GroceryListSkeleton from '~/app/groceries/_components/grocery-list-skeleton';

export const metadata: Metadata = {
  title: 'Groceries',
  description: 'A list of groceries to track',
};

type GroceriesPageProps = {
  searchParams?: {
    query?: string;
  };
};

export default async function Page({ searchParams }: GroceriesPageProps) {
  const searchQuery = searchParams?.query ?? '';

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Your Groceries</h1>
        <AddProductDialog trigger={<Button size="sm">Add product</Button>} />
      </div>
      <Suspense key={`${searchQuery}-list`} fallback={<GroceryListSkeleton />}>
        <GroceryList searchQuery={searchQuery} />
      </Suspense>
    </div>
  );
}
