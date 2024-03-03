import { type Metadata } from 'next';

import { getGroceries } from '~/server/data/groceries';
import { useUserId } from '~/app/dashboard/_hooks/useUserId';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';

export const metadata: Metadata = {
  title: 'Grocery List',
  description: 'A list of groceries to track',
};

export default async function TableView() {
  const userId = useUserId();
  const groceries = await getGroceries(userId);

  return (
    <>
      <div className="h-full flex-col space-y-8 p-8 md:flex">
        <DataTable data={groceries} columns={columns} />
      </div>
    </>
  );
}
