import Link from 'next/link';
import { FilmIcon } from '@heroicons/react/24/outline';
import { NavLinks } from '@/ui/components/NavLinks';

export function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex items-end justify-start rounded-md bg-primary p-4"
        href="/"
      >
        <div className="text-primary-content">
          <div className={`flex flex-row items-center gap-4 leading-none`}>
            <FilmIcon className="h-12 w-12 rotate-[15deg]" />
            <h1 className={'block text-2xl font-bold md:hidden'}>
              Dunscombe Family Movies
            </h1>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-base-100 md:block"></div>
      </div>
    </div>
  );
}
