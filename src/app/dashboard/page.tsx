import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';

import { getGroceries } from '~/server/data/groceries';
import { Button } from '~/components/ui/button';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import {
  HomeIcon,
  PackageIcon,
  LineChartIcon,
  Package2Icon,
  BellIcon,
  SearchIcon,
  ChevronRightIcon,
} from '~/components/icons';
import AddProductDialog from '~/app/dashboard/_components/add-product-dialog';

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  const groceries = await getGroceries(userId);

  return (
    <div className="flex min-h-screen w-full" id="dashboard">
      <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4">
            <Link className="flex items-center gap-3 font-semibold" href="#">
              <Package2Icon className="h-6 w-6" />
              <span className="">Dashboard</span>
            </Link>
            <Button className="ml-4 h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <PackageIcon className="h-4 w-4" />
                Products
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <LineChartIcon className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-950 md:w-2/3 lg:w-1/3"
                  placeholder="Search products..."
                  type="search"
                />
              </div>
            </form>
          </div>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Product Expiry
            </h1>
            <AddProductDialog
              trigger={
                <Button className="ml-auto" size="sm">
                  Add product
                </Button>
              }
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {groceries.map((grocery) => (
              <Card key={grocery.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex flex-col">
                    <CardTitle className="text-sm font-medium">
                      {grocery.productName}{' '}
                      {grocery.brand && `${grocery.brand}`}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {grocery.quantity} {grocery.unit && `${grocery.unit}`}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      Best before{' '}
                      {dayjs(grocery.expirationDate).format('DD.MM.YY')}
                    </CardDescription>
                  </div>
                  <ChevronRightIcon className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Image
                    alt={grocery.productName}
                    className="m-auto h-24 w-24"
                    height={64}
                    width={64}
                    src="/placeholder.jpg"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
