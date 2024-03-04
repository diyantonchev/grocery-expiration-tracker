import { type Metadata } from 'next';
import { getGrocery } from '~/server/data/groceries';

export const metadata: Metadata = {
  title: 'Grocery Page',
  description: 'A page to view the grocery details',
};

type GroceryPageProps = {
  params: { id: string };
};

export default async function GroceryPage({ params }: GroceryPageProps) {
  const grocery = await getGrocery(Number(params.id));

  if (!grocery) {
    return (
      <h2 className=" p-4 text-lg font-semibold md:p-4 md:text-2xl">
        Grocery not found
      </h2>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-4">
      <h2 className="text-lg font-semibold md:text-2xl">
        {grocery?.productName}
      </h2>
    </div>
  );
}
