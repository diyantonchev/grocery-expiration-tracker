import { Skeleton } from '~/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-4 py-16">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className=" h-96 w-2/3 rounded-xl" />
    </div>
  );
}
