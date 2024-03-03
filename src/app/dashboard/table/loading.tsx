import { Skeleton } from '~/components/ui/skeleton';

export default function TableLoading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-52 w-full" />
      </div>
    </div>
  );
}
