import { useState } from 'react';
import { Check, UserRound } from 'lucide-react';
import {
  ANY_THERAPIST_OPTION,
  THERAPISTS,
  TherapistItem,
} from '../data/catalog';

interface TherapistsSectionProps {
  selectedTherapist: string;
  onSelectTherapist: (therapistLabel: string) => void;
}

function TherapistPortraitCard({
  therapist,
  isSelected,
  onSelect,
}: {
  therapist: TherapistItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border bg-[#101713] transition-colors duration-150 ${
        isSelected
          ? 'border-[#C9A15D]'
          : 'border-[#80683F]/55 hover:border-[#C9A15D]/85'
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#123C30]/40">
        {!imgFailed ? (
          <img
            src={therapist.imagePath}
            alt={`Foto profil resmi ${therapist.label} Serenity Massage`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover object-[center_14%] transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#123C30]/80 via-[#092B22] to-[#101713] p-5 text-center">
            <div className="flex w-full items-center justify-between text-[11px] font-medium tracking-[0.18em] text-[#C9A15D]/80">
              <span>STAF RESMI</span>
              <span className="tabular-nums">{therapist.code}</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#C9A15D]/45 bg-[#061D17]/80 text-[#E3C58B]">
                <UserRound className="h-9 w-9 stroke-[1.5]" aria-hidden="true" />
              </div>
              <p className="mt-4 font-serif text-lg font-medium text-[#E4EEE7]">
                {therapist.label}
              </p>
              <p className="mt-1 max-w-[18ch] text-xs leading-relaxed text-[#AEBBB2]">
                Menunggu unggahan foto resmi terapis
              </p>
            </div>

            <div className="h-px w-12 bg-[#C9A15D]/40" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#C9A15D]/20 p-3.5 sm:p-4">
        <span className="font-serif text-base font-semibold text-[#E3C58B] sm:text-lg">
          {therapist.label}
        </span>

        <button
          type="button"
          onClick={onSelect}
          className={`inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
            isSelected
              ? 'border-[#C9A15D] bg-[#C9A15D] text-[#061D17]'
              : 'border-[#C9A15D]/45 bg-transparent text-[#E4EEE7] hover:border-[#E3C58B] hover:text-[#E3C58B]'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Dipilih</span>
            </>
          ) : (
            <span>Pilih</span>
          )}
        </button>
      </div>
    </article>
  );
}

export function TherapistsSection({
  selectedTherapist,
  onSelectTherapist,
}: TherapistsSectionProps) {
  const isAnySelected = selectedTherapist === ANY_THERAPIST_OPTION;

  return (
    <section
      id="terapis"
      className="border-y border-[#C9A15D]/20 bg-[#061D17]/60"
    >
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A15D] uppercase">
            Tim Kami
          </p>
          <h2
            className="mt-2.5 font-serif text-3xl font-semibold text-[#E4EEE7] sm:text-4xl"
            style={{ textWrap: 'balance' }}
          >
            Terapis Profesional
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#AEBBB2] sm:text-base">
            Pilih terapis yang Anda inginkan. Ketersediaan terapis akan
            dikonfirmasi secara manual oleh admin melalui WhatsApp.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {THERAPISTS.map((therapist) => (
            <TherapistPortraitCard
              key={therapist.id}
              therapist={therapist}
              isSelected={selectedTherapist === therapist.label}
              onSelect={() => onSelectTherapist(therapist.label)}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => onSelectTherapist(ANY_THERAPIST_OPTION)}
            className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border px-5 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${
              isAnySelected
                ? 'border-[#C9A15D] bg-[#123C30] text-[#E3C58B]'
                : 'border-[#80683F]/60 bg-[#101713] text-[#E4EEE7] hover:border-[#C9A15D] hover:text-[#E3C58B]'
            }`}
          >
            {isAnySelected && (
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span>Atau pilih: {ANY_THERAPIST_OPTION}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
