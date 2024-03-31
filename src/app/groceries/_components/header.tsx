import { UserButton } from '@clerk/nextjs';

import Notification from './notification';
import BurgerMenu from './burger-menu';
import Search from './search';

export default function Header() {
  return (
    <header className="flex h-14 justify-between gap-4 border-b bg-gray-100/40 px-4 dark:bg-gray-800/40">
      <div className="flex flex-1 items-center gap-4">
        <BurgerMenu />
        <Search />
      </div>
      <div className="flex items-center gap-4">
        <span className="md:hidden">
          <Notification />
        </span>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
