import { Check } from 'lucide-react';
import { SERVICES, formatRupiah } from '../data/catalog';

interface ServicesSectionProps {
  selectedServiceIndex: number;
  selectedDuration: number;
  onSelectServiceAndDuration: (serviceIndex: number, minutes: number) => void;
}

export function ServicesSection({
  selectedServiceIndex,
  selectedDuration,
  onSelectServiceAndDuration,
}: ServicesSectionProps) {
  return (
    <section
      id="layanan"
      className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A15D] uppercase">
          Pilihan Perawatan
        </p>
        <h2
          className="mt-2.5 font-serif text-3xl font-semibold text-[#E4EEE7] sm:text-4xl"
          style={{ textWrap: 'balance' }}
        >
          Layanan &amp; Harga
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#AEBBB2] sm:text-base">
          Pilih paket perawatan dan durasi di bawah ini untuk langsung
          memasukkannya ke formulir pemesanan.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, serviceIndex) => {
          const isServiceActive = selectedServiceIndex === serviceIndex;

          return (
            <article
              key={service.id}
              className={`flex flex-col justify-between rounded-xl border bg-[#101713] p-6 transition-colors duration-150 ${
                isServiceActive
                  ? 'border-[#C9A15D]'
                  : 'border-[#80683F]/55 hover:border-[#C9A15D]/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#C9A15D]">
                  <span className="font-semibold tracking-[0.18em] tabular-nums">
                    {service.indexLabel}
                  </span>
                  {isServiceActive && (
                    <span className="inline-flex items-center gap-1 font-medium text-[#E3C58B]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Dipilih</span>
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-serif text-xl leading-snug font-semibold text-[#E3C58B]">
                  {service.name}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#AEBBB2]">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 border-t border-[#C9A15D]/20 pt-4">
                <p className="mb-2.5 text-xs font-medium text-[#AEBBB2]">
                  Pilih durasi untuk booking:
                </p>
                <div className="flex flex-col gap-2">
                  {service.durations.map((option) => {
                    const isSelectedOption =
                      isServiceActive && selectedDuration === option.minutes;

                    return (
                      <button
                        key={option.minutes}
                        type="button"
                        onClick={() =>
                          onSelectServiceAndDuration(serviceIndex, option.minutes)
                        }
                        className={`flex min-h-[42px] w-full items-center justify-between gap-2 rounded-lg border px-3.5 py-2 text-left text-sm transition-colors duration-150 cursor-pointer ${
                          isSelectedOption
                            ? 'border-[#C9A15D] bg-[#123C30] text-[#E4EEE7] font-semibold'
                            : 'border-[#80683F]/45 bg-[#092B22]/55 text-[#E4EEE7]/90 hover:border-[#C9A15D] hover:bg-[#123C30]/70'
                        }`}
                      >
                        <span className="tabular-nums whitespace-nowrap">
                          {option.minutes} menit
                        </span>
                        <span className="font-semibold text-[#E3C58B] tabular-nums whitespace-nowrap">
                          {formatRupiah(option.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
