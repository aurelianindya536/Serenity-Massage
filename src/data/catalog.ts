// Pengaturan utama kontak & jam operasional (dapat diedit langsung)
export const ADMIN_WHATSAPP_NUMBER = '6285211852718';
export const ADMIN_WHATSAPP_DISPLAY = '+62 852 1185 2718';
export const OPERATIONAL_HOURS = '15.00–03.00 WIB';

export interface DurationOption {
  minutes: number;
  price: number;
}

export interface ServiceItem {
  id: string;
  indexLabel: string;
  name: string;
  description: string;
  durations: DurationOption[];
}

// Daftar layanan, durasi (menit), dan harga (Rupiah)
export const SERVICES: ServiceItem[] = [
  {
    id: 'full-body-massage',
    indexLabel: '01',
    name: 'Full Body Massage',
    description:
      'Pijatan tradisional dengan sentuhan tangan yang lembut dan nyaman untuk membantu merilekskan otot tubuh dan membuat tubuh terasa lebih segar.',
    durations: [
      { minutes: 90, price: 300000 },
      { minutes: 120, price: 350000 },
    ],
  },
  {
    id: 'full-body-kerokan',
    indexLabel: '02',
    name: 'Full Body Massage & Kerokan',
    description:
      'Kombinasi pijat seluruh tubuh dan kerokan tradisional untuk memberikan sensasi relaksasi.',
    durations: [
      { minutes: 90, price: 350000 },
      { minutes: 120, price: 400000 },
      { minutes: 150, price: 450000 },
    ],
  },
  {
    id: 'full-body-reflexology',
    indexLabel: '03',
    name: 'Full Body Massage & Reflexology',
    description:
      'Kombinasi pijat seluruh tubuh dan refleksi kaki untuk membantu merilekskan otot dan mengurangi ketegangan.',
    durations: [
      { minutes: 90, price: 350000 },
      { minutes: 120, price: 400000 },
      { minutes: 150, price: 450000 },
    ],
  },
  {
    id: 'full-body-scrub',
    indexLabel: '04',
    name: 'Full Body Massage & Scrub',
    description:
      'Kombinasi pijat relaksasi dan lulur scrub untuk membantu mengangkat sel kulit mati dan memberikan sensasi kulit lebih halus.',
    durations: [
      { minutes: 90, price: 350000 },
      { minutes: 120, price: 400000 },
      { minutes: 150, price: 450000 },
    ],
  },
];

export interface TherapistItem {
  id: string;
  code: string;
  label: string;
  imagePath: string;
}

// Daftar profil terapis dan lokasi file foto
export const THERAPISTS: TherapistItem[] = [
  {
    id: 'terapis-01',
    code: '01',
    label: 'Terapis 01',
    imagePath: '/assets/aistudio/1795515367789_b23dbaf6.jpg',
  },
  {
    id: 'terapis-02',
    code: '02',
    label: 'Terapis 02',
    imagePath: '/assets/aistudio/1795515384380_f30c6f8e.jpg',
  },
  {
    id: 'terapis-03',
    code: '03',
    label: 'Terapis 03',
    imagePath: '/assets/aistudio/1795515237176_fb6409ef.jpg',
  },
  {
    id: 'terapis-04',
    code: '04',
    label: 'Terapis 04',
    imagePath: '/assets/aistudio/1795515301309_96ef7e89.jpg',
  },
];

export const ANY_THERAPIST_OPTION = 'Terapis mana saja yang tersedia';

export const PLACE_TYPES = [
  'Hotel',
  'Apartemen',
  'Rumah',
  'Homestay',
  'Lainnya',
] as const;

export type PlaceType = (typeof PLACE_TYPES)[number];

export interface TimeSlot {
  value: string;
  label: string;
  isAfterMidnight: boolean;
}

export const BOOKING_TIME_SLOTS: TimeSlot[] = [
  15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3,
].map((hour) => {
  const formatted = `${String(hour).padStart(2, '0')}.00 WIB`;
  return {
    value: formatted,
    label: formatted,
    isAfterMidnight: hour >= 0 && hour <= 3,
  };
});

export function formatRupiah(amount: number): string {
  return `Rp${amount.toLocaleString('id-ID')}`;
}

export function getLocalTodayDateString(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

export function formatIndonesianDate(dateStr: string): string {
  if (!dateStr) return '—';
  const parts = dateStr.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return dateStr;
  const [year, month, day] = parts;
  const dateObj = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
}

export function validateIndonesianPhone(rawPhone: string): {
  valid: boolean;
  cleaned: string;
  error?: string;
} {
  const cleaned = rawPhone.replace(/[\s().-]/g, '');
  if (!cleaned) {
    return {
      valid: false,
      cleaned,
      error: 'Nomor WhatsApp wajib diisi.',
    };
  }
  const indonesianMobileRegex = /^(?:\+?62|0)8[1-9][0-9]{6,11}$/;
  if (!indonesianMobileRegex.test(cleaned)) {
    return {
      valid: false,
      cleaned,
      error:
        'Gunakan nomor WhatsApp Indonesia yang valid (contoh: 081234567890 atau +6281234567890).',
    };
  }
  return { valid: true, cleaned };
}

export interface BookingPayload {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  durationMinutes: number;
  therapist: string;
  placeType: PlaceType;
  placeName: string;
  date: string;
  time: string;
  notes: string;
  totalPrice: number;
}

export function buildWhatsAppMessage(payload: BookingPayload): string {
  const trimmedNotes = payload.notes.trim();
  return [
    'Halo Admin Serenity Massage, saya ingin melakukan pemesanan:',
    '',
    `Nama: ${payload.customerName.trim()}`,
    `No. WhatsApp: ${payload.customerPhone.trim()}`,
    `Layanan: ${payload.serviceName}`,
    `Durasi: ${payload.durationMinutes} menit`,
    `Terapis: ${payload.therapist}`,
    `Jenis tempat: ${payload.placeType}`,
    `Nama tempat: ${payload.placeName.trim()}`,
    `Tanggal: ${payload.date}`,
    `Jam: ${payload.time}`,
    `Catatan: ${trimmedNotes || '-'}`,
    `Total: ${formatRupiah(payload.totalPrice)}`,
    '',
    'Mohon konfirmasi ketersediaan. Terima kasih.',
  ].join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
