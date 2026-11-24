import { useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  ANY_THERAPIST_OPTION,
  BOOKING_TIME_SLOTS,
  PLACE_TYPES,
  PlaceType,
  SERVICES,
  THERAPISTS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatIndonesianDate,
  formatRupiah,
  getLocalTodayDateString,
  validateIndonesianPhone,
} from '../data/catalog';

interface BookingSectionProps {
  serviceIndex: number;
  durationMinutes: number;
  therapist: string;
  onChangeService: (serviceIndex: number) => void;
  onChangeDuration: (minutes: number) => void;
  onChangeTherapist: (therapistLabel: string) => void;
  serviceSelectRef: React.RefObject<HTMLSelectElement | null>;
  submitButtonContainerRef: React.RefObject<HTMLDivElement | null>;
}

interface FormErrors {
  customerName?: string;
  customerPhone?: string;
  placeName?: string;
  date?: string;
  time?: string;
}

export function BookingSection({
  serviceIndex,
  durationMinutes,
  therapist,
  onChangeService,
  onChangeDuration,
  onChangeTherapist,
  serviceSelectRef,
  submitButtonContainerRef,
}: BookingSectionProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [placeType, setPlaceType] = useState<PlaceType>('Hotel');
  const [placeName, setPlaceName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [submittedPayload, setSubmittedPayload] = useState<{
    message: string;
    waUrl: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const hiddenLinkRef = useRef<HTMLAnchorElement | null>(null);

  const minDate = useMemo(() => getLocalTodayDateString(), []);
  const selectedService = SERVICES[serviceIndex] ?? SERVICES[0];

  const activeDurationOption = useMemo(() => {
    return (
      selectedService.durations.find((d) => d.minutes === durationMinutes) ??
      selectedService.durations[0]
    );
  }, [selectedService, durationMinutes]);

  const selectedTimeSlot = useMemo(
    () => BOOKING_TIME_SLOTS.find((slot) => slot.value === time),
    [time],
  );

  const validateAll = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const today = getLocalTodayDateString();

    if (customerName.trim().length < 2) {
      nextErrors.customerName = 'Nama lengkap wajib diisi (minimal 2 karakter).';
    }

    const phoneValidation = validateIndonesianPhone(customerPhone);
    if (!phoneValidation.valid) {
      nextErrors.customerPhone = phoneValidation.error;
    }

    if (placeName.trim().length < 2) {
      nextErrors.placeName =
        'Nama hotel, apartemen, homestay, atau area tempat wajib diisi.';
    }

    if (!date) {
      nextErrors.date = 'Tanggal booking wajib dipilih.';
    } else if (date < today) {
      nextErrors.date = 'Tanggal booking tidak boleh sebelum hari ini.';
    }

    if (!time) {
      nextErrors.time = 'Jam booking wajib dipilih.';
    }

    return nextErrors;
  };

  const handleFieldBlur = () => {
    if (hasAttemptedSubmit) {
      setErrors(validateAll());
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorFieldId = validationErrors.customerName
        ? 'booking-name'
        : validationErrors.customerPhone
          ? 'booking-phone'
          : validationErrors.placeName
            ? 'booking-place-name'
            : validationErrors.date
              ? 'booking-date'
              : 'booking-time';
      document.getElementById(firstErrorFieldId)?.focus();
      return;
    }

    const message = buildWhatsAppMessage({
      customerName,
      customerPhone,
      serviceName: selectedService.name,
      durationMinutes: activeDurationOption.minutes,
      therapist,
      placeType,
      placeName,
      date,
      time,
      notes,
      totalPrice: activeDurationOption.price,
    });

    const waUrl = buildWhatsAppUrl(message);
    setSubmittedPayload({ message, waUrl });
    setCopied(false);

    // Open WhatsApp via anchor click rather than window.open
    requestAnimationFrame(() => {
      hiddenLinkRef.current?.click();
    });
  };

  const handleCopyMessage = async () => {
    if (!submittedPayload) return;
    try {
      await navigator.clipboard.writeText(submittedPayload.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const formattedPlaceSummary = placeName.trim()
    ? `${placeType} — ${placeName.trim()}`
    : `${placeType} — —`;

  return (
    <section
      id="booking"
      className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A15D] uppercase">
          Booking WhatsApp
        </p>
        <h2
          className="mt-2.5 font-serif text-3xl font-semibold text-[#E4EEE7] sm:text-4xl"
          style={{ textWrap: 'balance' }}
        >
          Pilih Layanan, Durasi &amp; Terapis
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#AEBBB2] sm:text-base">
          Lengkapi detail pemesanan di bawah ini. Ringkasan pesanan dan total
          biaya dihitung otomatis dan siap dikirim ke WhatsApp admin.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-7 rounded-2xl border border-[#80683F]/70 bg-gradient-to-br from-[#0B2019] to-[#102E23] p-5 sm:p-7 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
        {/* Form Column */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* 1. Layanan */}
            <div>
              <label
                htmlFor="booking-service"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                1. Pilih layanan
              </label>
              <select
                ref={serviceSelectRef}
                id="booking-service"
                value={serviceIndex}
                onChange={(e) => {
                  onChangeService(Number(e.target.value));
                  setSubmittedPayload(null);
                }}
                className="min-h-[46px] w-full rounded-lg border border-[#80683F] bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] transition-colors focus:border-[#E3C58B]"
              >
                {SERVICES.map((service, idx) => (
                  <option key={service.id} value={idx}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Durasi */}
            <div>
              <label
                htmlFor="booking-duration"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                2. Pilih durasi
              </label>
              <select
                id="booking-duration"
                value={activeDurationOption.minutes}
                onChange={(e) => {
                  onChangeDuration(Number(e.target.value));
                  setSubmittedPayload(null);
                }}
                className="min-h-[46px] w-full rounded-lg border border-[#80683F] bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] tabular-nums transition-colors focus:border-[#E3C58B]"
              >
                {selectedService.durations.map((option) => (
                  <option key={option.minutes} value={option.minutes}>
                    {option.minutes} menit — {formatRupiah(option.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Terapis */}
            <div className="sm:col-span-2">
              <label
                htmlFor="booking-therapist"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                3. Pilih terapis
              </label>
              <select
                id="booking-therapist"
                value={therapist}
                onChange={(e) => {
                  onChangeTherapist(e.target.value);
                  setSubmittedPayload(null);
                }}
                className="min-h-[46px] w-full rounded-lg border border-[#80683F] bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] transition-colors focus:border-[#E3C58B]"
              >
                {THERAPISTS.map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
                <option value={ANY_THERAPIST_OPTION}>
                  {ANY_THERAPIST_OPTION}
                </option>
              </select>
            </div>

            {/* 4. Nama pelanggan */}
            <div>
              <label
                htmlFor="booking-name"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                4. Nama Anda
              </label>
              <input
                id="booking-name"
                type="text"
                autoComplete="name"
                placeholder="Nama lengkap"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setSubmittedPayload(null);
                  if (hasAttemptedSubmit) handleFieldBlur();
                }}
                onBlur={handleFieldBlur}
                aria-invalid={Boolean(errors.customerName)}
                aria-describedby={
                  errors.customerName ? 'booking-name-error' : undefined
                }
                className={`min-h-[46px] w-full rounded-lg border bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] placeholder:text-[#AEBBB2]/55 transition-colors focus:border-[#E3C58B] ${
                  errors.customerName ? 'border-red-400' : 'border-[#80683F]'
                }`}
              />
              {errors.customerName && (
                <p
                  id="booking-name-error"
                  role="alert"
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{errors.customerName}</span>
                </p>
              )}
            </div>

            {/* 5. Nomor WhatsApp */}
            <div>
              <label
                htmlFor="booking-phone"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                5. Nomor WhatsApp Anda
              </label>
              <input
                id="booking-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Contoh: 0812xxxxxxx"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  setSubmittedPayload(null);
                  if (hasAttemptedSubmit) handleFieldBlur();
                }}
                onBlur={handleFieldBlur}
                aria-invalid={Boolean(errors.customerPhone)}
                aria-describedby={
                  errors.customerPhone ? 'booking-phone-error' : undefined
                }
                className={`min-h-[46px] w-full rounded-lg border bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] placeholder:text-[#AEBBB2]/55 tabular-nums transition-colors focus:border-[#E3C58B] ${
                  errors.customerPhone ? 'border-red-400' : 'border-[#80683F]'
                }`}
              />
              {errors.customerPhone && (
                <p
                  id="booking-phone-error"
                  role="alert"
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{errors.customerPhone}</span>
                </p>
              )}
            </div>

            {/* 6. Jenis tempat */}
            <div>
              <label
                htmlFor="booking-place-type"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                6. Jenis tempat
              </label>
              <select
                id="booking-place-type"
                value={placeType}
                onChange={(e) => {
                  setPlaceType(e.target.value as PlaceType);
                  setSubmittedPayload(null);
                }}
                className="min-h-[46px] w-full rounded-lg border border-[#80683F] bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] transition-colors focus:border-[#E3C58B]"
              >
                {PLACE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Nama hotel / tempat (tanpa alamat lengkap) */}
            <div>
              <label
                htmlFor="booking-place-name"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                7. Nama hotel / tempat
              </label>
              <input
                id="booking-place-name"
                type="text"
                placeholder="Contoh: Hotel Nusantara / Apartemen Melati"
                value={placeName}
                onChange={(e) => {
                  setPlaceName(e.target.value);
                  setSubmittedPayload(null);
                  if (hasAttemptedSubmit) handleFieldBlur();
                }}
                onBlur={handleFieldBlur}
                aria-invalid={Boolean(errors.placeName)}
                aria-describedby="booking-place-help"
                className={`min-h-[46px] w-full rounded-lg border bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] placeholder:text-[#AEBBB2]/55 transition-colors focus:border-[#E3C58B] ${
                  errors.placeName ? 'border-red-400' : 'border-[#80683F]'
                }`}
              />
              <p id="booking-place-help" className="mt-1.5 text-xs text-[#AEBBB2]">
                Cukup nama tempat atau area (tidak perlu alamat jalan lengkap).
              </p>
              {errors.placeName && (
                <p
                  role="alert"
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{errors.placeName}</span>
                </p>
              )}
            </div>

            {/* 8. Tanggal booking */}
            <div>
              <label
                htmlFor="booking-date"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                8. Tanggal booking
              </label>
              <input
                id="booking-date"
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSubmittedPayload(null);
                  if (hasAttemptedSubmit) handleFieldBlur();
                }}
                onBlur={handleFieldBlur}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'booking-date-error' : undefined}
                className={`min-h-[46px] w-full rounded-lg border bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] tabular-nums transition-colors focus:border-[#E3C58B] ${
                  errors.date ? 'border-red-400' : 'border-[#80683F]'
                }`}
              />
              {errors.date && (
                <p
                  id="booking-date-error"
                  role="alert"
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            {/* 9. Jam booking */}
            <div>
              <label
                htmlFor="booking-time"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                9. Jam booking (15.00–03.00 WIB)
              </label>
              <select
                id="booking-time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setSubmittedPayload(null);
                  if (hasAttemptedSubmit) handleFieldBlur();
                }}
                onBlur={handleFieldBlur}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? 'booking-time-error' : undefined}
                className={`min-h-[46px] w-full rounded-lg border bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] tabular-nums transition-colors focus:border-[#E3C58B] ${
                  errors.time ? 'border-red-400' : 'border-[#80683F]'
                }`}
              >
                <option value="">Pilih jam</option>
                {BOOKING_TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                    {slot.isAfterMidnight ? ' (Dini hari)' : ''}
                  </option>
                ))}
              </select>
              {selectedTimeSlot?.isAfterMidnight && (
                <p className="mt-1.5 text-xs text-[#E3C58B]">
                  Jam 00.00–03.00 WIB termasuk rentang operasional malam hingga
                  dini hari; admin akan mengonfirmasi ketersediaan terapis.
                </p>
              )}
              {errors.time && (
                <p
                  id="booking-time-error"
                  role="alert"
                  className="mt-1.5 flex items-start gap-1.5 text-xs text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{errors.time}</span>
                </p>
              )}
            </div>

            {/* 10. Catatan tambahan */}
            <div className="sm:col-span-2">
              <label
                htmlFor="booking-notes"
                className="mb-2 block text-sm font-semibold text-[#E4EEE7]"
              >
                10. Catatan tambahan (opsional)
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                placeholder="Contoh: preferensi tekanan pijat atau petunjuk akses lobi (tanpa alamat jalan lengkap)."
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setSubmittedPayload(null);
                }}
                className="w-full resize-y rounded-lg border border-[#80683F] bg-[#101713] px-3.5 py-2.5 text-sm text-[#E4EEE7] placeholder:text-[#AEBBB2]/55 transition-colors focus:border-[#E3C58B]"
              />
            </div>
          </div>

          <div ref={submitButtonContainerRef} className="pt-1">
            <button
              type="submit"
              className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#11834F] px-6 py-3.5 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#149A5C] cursor-pointer sm:text-base"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Kirim Pesanan ke WhatsApp Admin</span>
            </button>
            <p className="mt-2.5 text-xs leading-relaxed text-[#AEBBB2]">
              Jadwal dan ketersediaan terapis belum otomatis terverifikasi.
              Pesanan baru diproses setelah admin membalas WhatsApp Anda.
            </p>
          </div>

          {/* Hidden anchor for opening WhatsApp smoothly on valid submit */}
          <a
            ref={hiddenLinkRef}
            href={submittedPayload?.waUrl ?? '#booking'}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          >
            Buka WhatsApp
          </a>

          {/* Interactive Confirmation & Fallback Panel after Submit */}
          {submittedPayload && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-[#C9A15D] bg-[#101713] p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-serif text-lg font-semibold text-[#E3C58B]">
                  Pesan Booking Siap Dikirim
                </p>
                <span className="text-xs text-[#AEBBB2]">
                  Menunggu konfirmasi manual admin
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#AEBBB2]">
                Jika tab WhatsApp belum terbuka otomatis oleh browser Anda,
                gunakan tombol di bawah atau salin teks pesanan berikut:
              </p>

              <pre className="mt-3 max-h-52 overflow-y-auto rounded-lg border border-[#80683F]/45 bg-[#061D17] p-3 font-sans text-xs leading-relaxed whitespace-pre-wrap text-[#E4EEE7]">
                {submittedPayload.message}
              </pre>

              <div className="mt-3.5 flex flex-wrap gap-2.5">
                <a
                  href={submittedPayload.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#11834F] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#149A5C] sm:text-sm"
                >
                  <span>Buka WhatsApp Admin</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-[#C9A15D]/60 bg-transparent px-4 py-2 text-xs font-semibold text-[#E3C58B] transition-colors hover:bg-[#123C30] cursor-pointer sm:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Teks Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Salin Teks Pesanan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Live Order Summary Column */}
        <aside
          aria-label="Ringkasan pesanan"
          className="rounded-xl border border-[#80683F]/75 bg-[#101713] p-5 sm:p-6 lg:sticky lg:top-24"
        >
          <h3 className="font-serif text-2xl font-semibold text-[#E3C58B]">
            Ringkasan Pesanan
          </h3>
          <p className="mt-1 text-xs text-[#AEBBB2]">
            Diperbarui otomatis sesuai pilihan formulir Anda.
          </p>

          <dl className="mt-5 divide-y divide-[#E4EEE7]/10 text-sm">
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Layanan</dt>
              <dd className="text-right font-semibold text-[#E4EEE7]">
                {selectedService.name}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Durasi</dt>
              <dd className="text-right font-semibold text-[#E4EEE7] tabular-nums">
                {activeDurationOption.minutes} menit
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Terapis</dt>
              <dd className="text-right font-semibold text-[#E4EEE7]">
                {therapist}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Tanggal</dt>
              <dd className="text-right font-semibold text-[#E4EEE7] tabular-nums">
                {formatIndonesianDate(date)}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Jam</dt>
              <dd className="text-right font-semibold text-[#E4EEE7] tabular-nums">
                {time || '—'}
              </dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-[#AEBBB2]">Lokasi</dt>
              <dd className="text-right font-semibold text-[#E4EEE7]">
                {formattedPlaceSummary}
              </dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-[#C9A15D]/35 pt-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-[#AEBBB2]">
                Total Harga
              </span>
              <span className="font-serif text-2xl font-bold text-[#E3C58B] tabular-nums">
                {formatRupiah(activeDurationOption.price)}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[#AEBBB2]">
              Pembayaran dan ketersediaan jadwal dikonfirmasi langsung saat
              berkomunikasi dengan admin melalui WhatsApp.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
