import { Toaster } from 'react-hot-toast';
import Header from '~/app/dashboard/_components/header';
import Sidebar from '~/app/dashboard/_components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full" id="dashboard">
      <Sidebar />
      <div className="flex w-full flex-col">
        <Header />
        <main>{children}</main>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}
