import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Skeleton className="h-8 w-7/12" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
}
