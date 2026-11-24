import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OPERATIONAL_HOURS } from '../data/catalog';

interface HeaderProps {
  onNavigateToSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'terapis', label: 'Terapis' },
  { id: 'booking', label: 'Booking' },
];

export function Header({ onNavigateToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    onNavigateToSection(sectionId);
  };

  return (
    <>
      <div className="bg-[#061D17] border-b border-[#C9A15D]/20 px-4 py-2 text-center text-xs text-[#E3C58B]">
        <span>Jam Operasional {OPERATIONAL_HOURS}</span>
        <span aria-hidden="true" className="mx-2 text-[#80683F]">
          ·
        </span>
        <span className="text-[#AEBBB2]">
          Pemesanan malam hingga dini hari dikonfirmasi manual oleh admin
        </span>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#C9A15D]/25 bg-[#092B22]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3.5 sm:px-6 md:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-serif text-lg font-semibold tracking-[0.14em] text-[#E4EEE7] transition-colors duration-200 hover:text-[#E3C58B] sm:text-xl whitespace-nowrap shrink-0"
          >
            SERENITY MASSAGE
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-7 text-sm font-medium text-[#E4EEE7]/90 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="relative py-1 transition-colors duration-150 hover:text-[#E3C58B] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#C9A15D] after:transition-transform after:duration-200 hover:after:scale-x-100 whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, 'booking')}
              className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#C9A15D] px-4 py-2 text-xs font-bold tracking-wide text-[#061D17] transition-colors duration-150 hover:bg-[#E3C58B] sm:px-5 sm:text-sm whitespace-nowrap shrink-0"
            >
              Pesan Sekarang
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-lg border border-[#C9A15D]/35 bg-[#101713]/70 text-[#E4EEE7] transition-colors duration-150 hover:border-[#C9A15D] hover:text-[#E3C58B] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Navigasi seluler"
            className="border-t border-[#C9A15D]/20 bg-[#061D17] px-4 py-3 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#E4EEE7] transition-colors duration-150 hover:bg-[#123C30] hover:text-[#E3C58B]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
