import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { TherapistsSection } from './components/TherapistsSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import {
  ADMIN_WHATSAPP_NUMBER,
  SERVICES,
  THERAPISTS,
} from './data/catalog';

export default function App() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(
    SERVICES[0].durations[0].minutes,
  );
  const [therapist, setTherapist] = useState(THERAPISTS[0].label);
  const [hideFloatingWa, setHideFloatingWa] = useState(false);

  const serviceSelectRef = useRef<HTMLSelectElement | null>(null);
  const submitButtonContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = submitButtonContainerRef.current;
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideFloatingWa(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string, focusBooking = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (focusBooking) {
      window.setTimeout(() => {
        serviceSelectRef.current?.focus({ preventScroll: true });
      }, 350);
    }
  };

  const handleServiceChange = (nextIndex: number) => {
    const nextService = SERVICES[nextIndex] ?? SERVICES[0];
    setServiceIndex(nextIndex);

    const hasCurrentDuration = nextService.durations.some(
      (d) => d.minutes === durationMinutes,
    );
    if (!hasCurrentDuration) {
      setDurationMinutes(nextService.durations[0].minutes);
    }
  };

  const handleSelectServiceAndDuration = (
    nextIndex: number,
    minutes: number,
  ) => {
    const nextService = SERVICES[nextIndex] ?? SERVICES[0];
    const validDuration = nextService.durations.some(
      (d) => d.minutes === minutes,
    )
      ? minutes
      : nextService.durations[0].minutes;

    setServiceIndex(nextIndex);
    setDurationMinutes(validDuration);
    scrollToSection('booking');
  };

  const handleSelectTherapist = (therapistLabel: string) => {
    setTherapist(therapistLabel);
    scrollToSection('booking');
  };

  const quickWhatsAppUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Halo Serenity Massage, saya ingin bertanya tentang layanan dan ketersediaan terapis.',
  )}`;

  return (
    <div className="min-h-screen bg-[#092B22] text-[#E4EEE7]">
      <Header onNavigateToSection={(id) => scrollToSection(id)} />

      <main>
        <HeroSection
          onSelectBooking={() => scrollToSection('booking', true)}
          onBrowseServices={() => scrollToSection('layanan')}
        />

        <ServicesSection
          selectedServiceIndex={serviceIndex}
          selectedDuration={durationMinutes}
          onSelectServiceAndDuration={handleSelectServiceAndDuration}
        />

        <TherapistsSection
          selectedTherapist={therapist}
          onSelectTherapist={handleSelectTherapist}
        />

        <BookingSection
          serviceIndex={serviceIndex}
          durationMinutes={durationMinutes}
          therapist={therapist}
          onChangeService={handleServiceChange}
          onChangeDuration={setDurationMinutes}
          onChangeTherapist={setTherapist}
          serviceSelectRef={serviceSelectRef}
          submitButtonContainerRef={submitButtonContainerRef}
        />
      </main>

      <Footer />

      {/* Floating WhatsApp Quick-Chat Button (hides when booking submit area is in view) */}
      <a
        href={quickWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp Admin Serenity Massage"
        className={`fixed right-4 bottom-4 z-20 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#11834F] px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-opacity duration-200 hover:bg-[#149A5C] sm:right-6 sm:bottom-6 sm:text-sm ${
          hideFloatingWa
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-100'
        }`}
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
