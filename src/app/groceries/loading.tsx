import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      </div>
    </div>
  );
}
