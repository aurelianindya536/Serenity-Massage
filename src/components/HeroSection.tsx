import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { OPERATIONAL_HOURS } from '../data/catalog';

interface HeroSectionProps {
  onSelectBooking: () => void;
  onBrowseServices: () => void;
}

const HERO_IMAGE_PATH = '/src/assets/images/hero_massage_1795507508983.jpg';

export function HeroSection({
  onSelectBooking,
  onBrowseServices,
}: HeroSectionProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[#C9A15D]/20 bg-[#061D17]"
    >
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[580px] lg:grid-cols-12 lg:items-stretch">
        {/* Left Copy Column */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-18 lg:col-span-5 lg:py-20 lg:pl-14 lg:pr-8">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A15D] uppercase">
            Pijat Panggilan Profesional · Traditional Wellness
          </p>

          <h1
            className="mt-4 max-w-xl font-serif text-[2.35rem] leading-[1.1] font-semibold text-[#E4EEE7] sm:text-5xl lg:text-[3.5rem]"
            style={{ textWrap: 'balance' }}
          >
            Rilekskan Tubuh,
            <br />
            <em className="font-medium italic text-[#E3C58B]">
              Segarkan Pikiran.
            </em>
          </h1>

          <p className="mt-5 max-w-[48ch] text-base leading-[1.7] text-[#E4EEE7]/85">
            Nikmati pijat tradisional dan relaksasi tanpa harus keluar dari
            tempat menginap. Kami siap melayani panggilan ke hotel, apartemen,
            homestay, dan rumah Anda.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onSelectBooking}
              className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg bg-[#C9A15D] px-6 py-3 text-sm font-bold text-[#061D17] transition-colors duration-150 hover:bg-[#E3C58B] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>Pilih Layanan &amp; Terapis</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onBrowseServices}
              className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-[#C9A15D]/45 bg-[#101713]/70 px-5 py-3 text-sm font-medium text-[#E4EEE7] transition-colors duration-150 hover:border-[#E3C58B] hover:text-[#E3C58B] cursor-pointer whitespace-nowrap shrink-0"
            >
              Lihat Daftar Harga
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#C9A15D]/20 pt-5 text-xs text-[#AEBBB2]">
            <span className="text-[#E3C58B] font-medium">
              Operasional {OPERATIONAL_HOURS}
            </span>
            <span aria-hidden="true">·</span>
            <span>Hotel, Apartemen, Homestay &amp; Rumah</span>
            <span aria-hidden="true">·</span>
            <span>Konfirmasi via WhatsApp Admin</span>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:col-span-7 lg:min-h-full">
          {!imageError ? (
            <img
              src={HERO_IMAGE_PATH}
              alt="Terapis Serenity Massage memberikan pijat bahu dan punggung atas yang profesional di ruang wellness yang tenang"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover object-center lg:absolute lg:inset-0"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-full min-h-[300px] w-full items-center justify-center bg-gradient-to-br from-[#123C30] via-[#092B22] to-[#061D17] p-8"
            >
              <div className="text-center">
                <p className="font-serif text-2xl tracking-[0.2em] text-[#E3C58B]">
                  SERENITY MASSAGE
                </p>
                <p className="mt-2 text-xs tracking-[0.25em] text-[#AEBBB2]">
                  TRADITIONAL WELLNESS
                </p>
              </div>
            </div>
          )}

          {/* Measured left-to-right & bottom scrim for seamless emerald blend */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061D17] via-transparent to-[#061D17]/30 lg:bg-gradient-to-r lg:from-[#061D17] lg:via-[#061D17]/35 lg:to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
