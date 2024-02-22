import { Skeleton } from '~/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden w-60 lg:block">
        <Skeleton className="mb-2 h-14" />
        <Skeleton className="h-full" />
      </div>

      <div className="flex flex-1 flex-col">
        <Skeleton className="ml-4 h-14" />
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
    </div>
  );
}
