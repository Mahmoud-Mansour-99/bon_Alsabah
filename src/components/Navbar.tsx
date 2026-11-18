import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CoffeeBeanIcon } from './Icons';

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'منتجاتنا', href: '#products' },
  { label: 'ليه بن الصباح؟', href: '#why-us' },
  { label: 'تواصل معنا', href: '#contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#2C1A12]/10 bg-[#FAF6F0]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg py-1 text-[#2C1A12] transition-opacity duration-150 hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C3A21]"
        >
          <CoffeeBeanIcon className="h-6 w-6 text-[#8C5219]" />
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold leading-none">
            بن الصباح
          </span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 whitespace-nowrap py-1 text-sm font-semibold text-[#3D2B22] transition-colors duration-150 hover:text-[#2C1A12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5C3A21]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 bg-[#C88A4B] transition-transform duration-200 group-hover:scale-x-100"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#products"
            className="inline-flex min-h-[40px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#5C3A21] px-4 py-2 text-sm font-semibold text-[#FAF6F0] transition-colors duration-150 hover:bg-[#2C1A12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
          >
            اطلب الآن
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#2C1A12] transition-colors duration-150 hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="قائمة الجوال"
          className="border-t border-[#2C1A12]/10 bg-[#FAF6F0] px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-semibold text-[#2C1A12] transition-colors duration-150 hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
