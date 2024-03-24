'use client';

import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Button from '@/ui/components/Button';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  // {
  //   name: 'Invoices',
  //   href: '/dashboard/invoices',
  //   icon: DocumentDuplicateIcon,
  // },
  // {name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon},
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow')}
          >
            <Button
              active={pathname === link.href}
              className={'w-full'}
              startIcon={<LinkIcon className="w-6" />}
            >
              <p className="hidden md:block">{link.name}</p>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
