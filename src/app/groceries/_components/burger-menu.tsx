import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import { MenuIcon } from '~/components/icons';
import Navigation from './navigation';

export default function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon className="block h-6 w-6 md:hidden" />
      </SheetTrigger>
      <SheetContent side="left">
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
