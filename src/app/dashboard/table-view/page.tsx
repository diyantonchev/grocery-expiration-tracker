import { useUserId } from '~/app/dashboard/_hooks/useUserId';
import { getGroceries } from '~/server/data/groceries';

export default async function TableView() {
  const userId = useUserId();
  const groceries = await getGroceries(userId);

  return <div>Table</div>;
}
