import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Skeleton className="m-2 h-8 w-1/4 md:m-4" />
      <Skeleton className="mx-auto mt-8 h-96 w-1/3 rounded-xl" />
    </div>
  );
}
