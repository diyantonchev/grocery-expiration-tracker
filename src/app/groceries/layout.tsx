import { Toaster } from 'react-hot-toast';
import Header from '~/app/groceries/_components/header';
import Sidebar from '~/app/groceries/_components/sidebar';

export default function GroceriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full" id="groceries">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main>{children}</main>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
