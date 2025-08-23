// File: src/components/NavItem.tsx

import Link from 'next/link';

// Define the properties (props) the component will accept
type NavItemProps = {
  href?: string;
  text: string;
  hasDropdown?: boolean;
  onClick?: () => void;
};

export default function NavItem({ href, text, hasDropdown = false, onClick }: NavItemProps) {
  const content = (
    <div
      onClick={onClick}
      className="flex items-center space-x-1 cursor-pointer py-2 border-b-2 border-transparent hover:border-red-600 transition-colors"
    >
      {href ? (
        <Link href={href}>
          <span>{text}</span>
        </Link>
      ) : (
        <span>{text}</span>
      )}
      {hasDropdown && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );

  return content;
}