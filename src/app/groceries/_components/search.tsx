'use client';

import {
  useSearchParams,
  usePathname,
  useRouter,
  redirect,
} from 'next/navigation';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '~/components/ui/input';

const SEARCH_QUERY = 'query';

export default function QuerySearch() {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  const isGroceryHomePage = /^\/groceries($|\?)/.test(pathname);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(SEARCH_QUERY, term);
    } else {
      params.delete(SEARCH_QUERY);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const onSubmit = (formData: FormData) => {
    const term = formData.get('term');
    if (!term) return;

    const params = new URLSearchParams(searchParams);
    params.set(SEARCH_QUERY, term as string);
    redirect(`/groceries/?${params.toString()}`);
  };

  return (
    <div className="relative flex-1">
      <SearchFrom action={isGroceryHomePage ? undefined : onSubmit}>
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input
          id="search-groceries"
          className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
          placeholder="Search groceries..."
          name="term"
          type="search"
          onChange={
            isGroceryHomePage ? (e) => handleSearch(e.target.value) : undefined
          }
          autoComplete="off"
          defaultValue={searchParams.get(SEARCH_QUERY)?.toString()}
        />
      </SearchFrom>
    </div>
  );
}

function SearchFrom({
  action,
  children,
}: {
  action?: (formData: FormData) => void;
  children: React.ReactNode;
}) {
  return action ? <form action={action}>{children}</form> : <>{children}</>;
}
