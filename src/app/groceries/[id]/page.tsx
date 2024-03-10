import { type Metadata } from 'next';
import Image from 'next/image';
import dayjs from 'dayjs';

import { getGrocery } from '~/server/data/groceries';
import { CardBody, CardContainer, CardItem } from '~/components/ui/3d-card';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { GroceryDeleteButton } from './_components/grocery-delete-button';

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

  const isExpired = dayjs(grocery.expirationDate).isBefore(dayjs());

  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem
          translateZ="50"
          className="text-2xl font-bold text-neutral-600 dark:text-white"
        >
          {grocery.productName} {grocery.brand && `${grocery.brand}`}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-neutral-500 dark:text-neutral-300"
        >
          {grocery.quantity} {grocery.unit && `${grocery.unit}`}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-neutral-500 dark:text-neutral-300"
        >
          Best before{' '}
          <span className={cn(isExpired ? 'text-red-500' : '')}>
            {dayjs(grocery.expirationDate).format('DD.MM.YY')}
          </span>
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src="/placeholder.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-8 flex items-center justify-end gap-2">
          <CardItem translateZ={20}>
            <Button className="bg-green-500 px-6 hover:bg-green-500/90 dark:bg-green-900 dark:text-gray-50 dark:hover:bg-green-900/90">
              Edit
            </Button>
          </CardItem>
          <CardItem translateZ={20}>
            <GroceryDeleteButton groceryId={grocery.id} />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
