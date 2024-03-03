import { type Metadata } from 'next';

import { getGroceries } from '~/server/data/groceries';
import { useUserId } from '~/app/dashboard/_hooks/useUserId';

import { DataTable } from '~/components/ui/data-table/data-table';
import { columns } from '~/app/dashboard/table-view/components/columns';

export const metadata: Metadata = {
  title: 'Grocery List',
  description: 'A list of groceries to track',
};

export default async function TableView() {
  const userId = useUserId();
  const groceries = await getGroceries(userId);

  const filterColumnsData = groceries.reduce<{
    category: string[];
    brand: string[];
  }>(
    (acc, { category, brand }) => {
      if (category && !acc.category.includes(category)) {
        acc.category.push(category);
      }

      if (brand && !acc.brand.includes(brand)) {
        acc.brand.push(brand);
      }

      return acc;
    },
    { category: [], brand: [] },
  );

  return (
    <>
      <div className="h-full flex-col space-y-8 p-8 md:flex">
        <DataTable
          data={groceries}
          columns={columns}
          search={{ column: 'productName', placeholder: 'Filter groceries...' }}
          filterColumnsData={filterColumnsData}
        />
      </div>
    </>
  );
}
