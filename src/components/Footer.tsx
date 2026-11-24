import {
  ADMIN_WHATSAPP_DISPLAY,
  ADMIN_WHATSAPP_NUMBER,
  OPERATIONAL_HOURS,
} from '../data/catalog';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#C9A15D]/25 bg-[#061D17] px-4 py-12 text-center sm:px-6">
      <div className="mx-auto max-w-[900px]">
        <p className="font-serif text-2xl font-semibold tracking-[0.16em] text-[#E3C58B]">
          SERENITY MASSAGE
        </p>
        <p className="mt-1 text-[11px] font-medium tracking-[0.28em] text-[#C9A15D] uppercase">
          Traditional Wellness
        </p>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#AEBBB2]">
          Jasa pijat tradisional dan relaksasi panggilan ke hotel, apartemen,
          homestay, dan rumah Anda. Seluruh pemesanan dikonfirmasi manual oleh
          admin.
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#E4EEE7]">
          <span>
            WhatsApp Admin:{' '}
            <a
              href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#E3C58B] underline decoration-[#C9A15D]/45 underline-offset-4 transition-colors hover:text-white tabular-nums"
            >
              {ADMIN_WHATSAPP_DISPLAY}
            </a>
          </span>
          <span aria-hidden="true" className="text-[#80683F]">
            ·
          </span>
          <span className="tabular-nums">
            Jam operasional: {OPERATIONAL_HOURS}
          </span>
        </div>

        <p className="mt-7 text-xs text-[#AEBBB2]/80">
          &copy; {currentYear} Serenity Massage. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
