import { useEffect, useRef, useState } from 'react';
import {
  CoffeeProduct,
  FEATURES,
  HERO_IMAGE,
  PRODUCTS,
} from './data/coffeeData';
import { Navbar } from './components/Navbar';
import { CoffeeImage } from './components/CoffeeImage';
import { OrderPreviewModal } from './components/OrderPreviewModal';
import {
  AirtightSealIcon,
  CoffeeBeanIcon,
  DeliveryTruckIcon,
  FacebookIcon,
  FastOrderIcon,
  GrindVarietyIcon,
  InstagramIcon,
  WhatsAppIcon,
} from './components/Icons';

function getFeatureIcon(id: string) {
  switch (id) {
    case 'grind-variety':
      return <GrindVarietyIcon className="h-6 w-6 text-[#5C3A21]" />;
    case 'airtight-packaging':
      return <AirtightSealIcon className="h-6 w-6 text-[#5C3A21]" />;
    case 'fast-ordering':
    default:
      return <FastOrderIcon className="h-6 w-6 text-[#5C3A21]" />;
  }
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(
    null
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.reveal-section');
    if (sections.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      sections.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  const openWhatsAppPreview = (product: CoffeeProduct | null = null) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeWhatsAppPreview = () => {
    setModalOpen(false);
  };

  const handleSocialClick = (platformName: string) => {
    showToast(`حساب ${platformName} سيتم تفعيله قريباً!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#3D2B22]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Hero Content */}
            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="text-sm font-semibold text-[#8C5219]">
                تحميص طازج · القاهرة والجيزة
              </p>

              <h1
                style={{ textWrap: 'balance' }}
                className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.75rem,5vw,4.25rem)] font-bold leading-[1.15] text-[#2C1A12]"
              >
                بن الصباح
              </h1>

              <p
                style={{ textWrap: 'balance' }}
                className="mt-3 text-xl font-bold text-[#5C3A21] sm:text-2xl"
              >
                قهوتك المفضلة لحد باب بيتك
              </p>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3D2B22] sm:text-lg">
                بنقدملك أجود أنواع البن الطازج المحمص بعناية، عشان تستمتع بفنجان
                قهوة مظبوط في بيتك كل يوم.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openWhatsAppPreview(null)}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#157A40] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#116334] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157A40] sm:text-base"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0" />
                  <span>اطلب عبر واتساب</span>
                </button>

                <a
                  href="#products"
                  className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-xl border border-[#5C3A21]/30 bg-transparent px-6 py-3 text-sm font-bold text-[#2C1A12] transition-colors duration-150 hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21] sm:text-base"
                >
                  تصفح المنتجات
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6">
              <div className="h-full overflow-hidden rounded-2xl border border-[#2C1A12]/10 bg-[#EFE6D8] shadow-xl">
                <CoffeeImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  priority
                  containerClassName="aspect-[4/3] h-full w-full min-h-[280px] lg:aspect-auto lg:min-h-[420px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="reveal-section border-t border-[#2C1A12]/8 bg-[#EFE6D8]/45 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                style={{ textWrap: 'balance' }}
                className="text-2xl font-bold text-[#2C1A12] sm:text-3xl"
              >
                تشكيلة بن الصباح
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[#3D2B22]">
                بن طازج يُطحن عند الطلب لضمان أعلى جودة وأغنى نكهة
              </p>
            </div>

            {/* 3-Column Product Grid */}
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {PRODUCTS.map((product) => (
                <article
                  key={product.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#2C1A12]/10 bg-[#FAF6F0] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CoffeeImage
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    containerClassName="aspect-[4/3] w-full"
                    className="transition-transform duration-300 group-hover:scale-[1.03]"
                  />

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#8C5219]">
                        <span>{product.weight}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.roastNote}</span>
                      </div>

                      <div className="mt-2 flex items-baseline justify-between gap-3">
                        <h3 className="text-lg font-bold text-[#2C1A12]">
                          {product.title}
                        </h3>
                        <span className="shrink-0 whitespace-nowrap text-base font-bold tabular-nums text-[#5C3A21]">
                          {product.price} {product.currency}
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-[#3D2B22]">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        onClick={() => openWhatsAppPreview(product)}
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#5C3A21] px-4 py-2.5 text-sm font-bold text-[#FAF6F0] transition-colors duration-150 hover:bg-[#2C1A12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
                      >
                        <WhatsAppIcon className="h-4 w-4 shrink-0" />
                        <span>اطلب هذا المنتج</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Delivery Info Banner */}
            <div className="mt-8 flex items-center gap-3.5 rounded-2xl border border-[#2C1A12]/12 bg-[#EFE6D8] px-5 py-4 text-[#2C1A12]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF6F0] text-[#5C3A21]">
                <DeliveryTruckIcon className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold leading-relaxed sm:text-base">
                التوصيل متاح داخل القاهرة والجيزة فقط — وتُحدد رسوم التوصيل حسب
                المنطقة.
              </p>
            </div>
          </div>
        </section>

        {/* Features / Why Us Section */}
        <section
          id="why-us"
          className="reveal-section py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                style={{ textWrap: 'balance' }}
                className="text-2xl font-bold text-[#2C1A12] sm:text-3xl"
              >
                ليه تختار بن الصباح؟
              </h2>
              <p className="mt-2.5 text-base leading-relaxed text-[#3D2B22]">
                نهتم بكل تفصيلة من اختيار حبوب القهوة لحد ما توصلك طازجة لباب
                بيتك.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col rounded-2xl border border-[#2C1A12]/10 bg-[#EFE6D8]/60 p-6 transition-colors duration-150 hover:bg-[#EFE6D8]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF6F0] border border-[#2C1A12]/8">
                      {getFeatureIcon(feature.id)}
                    </span>
                    <span className="text-sm font-bold tabular-nums text-[#8C5219]">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#2C1A12]">
                    {feature.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#3D2B22] sm:text-base">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact & Order Section */}
        <section
          id="contact"
          className="reveal-section pb-16 pt-4 sm:pb-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#2C1A12]/10 bg-[#EFE6D8] px-6 py-12 text-center sm:px-12 sm:py-16">
              <div className="mx-auto max-w-2xl">
                <h2
                  style={{ textWrap: 'balance' }}
                  className="text-2xl font-bold text-[#2C1A12] sm:text-3xl"
                >
                  جاهز تطلب قهوتك؟
                </h2>

                <p className="mt-3 text-base leading-relaxed text-[#3D2B22]">
                  تواصل معنا مباشرة عبر واتساب لطلب قهوتك المفضلة أو للاستفسار
                  عن درجات الطحن المتاحة.
                </p>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => openWhatsAppPreview(null)}
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-[#157A40] px-8 py-3.5 text-base font-bold text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#116334] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#157A40]"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />
                    <span>اطلب عبر واتساب</span>
                  </button>
                </div>

                {/* Social Media Placeholders */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialClick('فيسبوك')}
                    aria-label="فيسبوك - قريباً"
                    className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2C1A12]/12 bg-[#FAF6F0] text-[#2C1A12] transition-colors duration-150 hover:bg-[#5C3A21] hover:text-[#FAF6F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
                  >
                    <FacebookIcon className="h-5 w-5" />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2C1A12] px-2 py-1 text-xs font-semibold text-[#FAF6F0] opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      قريباً
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialClick('إنستجرام')}
                    aria-label="إنستجرام - قريباً"
                    className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#2C1A12]/12 bg-[#FAF6F0] text-[#2C1A12] transition-colors duration-150 hover:bg-[#5C3A21] hover:text-[#FAF6F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
                  >
                    <InstagramIcon className="h-5 w-5" />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2C1A12] px-2 py-1 text-xs font-semibold text-[#FAF6F0] opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      قريباً
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2C1A12] text-[#FAF6F0]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-center sm:flex-row sm:px-6 sm:text-right lg:px-8">
          <div className="flex flex-col items-center gap-1.5 sm:items-start">
            <a
              href="#hero"
              className="inline-flex items-center gap-2 text-[#FAF6F0] transition-opacity duration-150 hover:opacity-85"
            >
              <CoffeeBeanIcon className="h-5 w-5 text-[#C88A4B]" />
              <span className="font-[family-name:var(--font-display)] text-2xl font-bold leading-none">
                بن الصباح
              </span>
            </a>
            <p className="text-xs text-[#EFE6D8]/85">
              التوصيل متاح داخل القاهرة والجيزة فقط
            </p>
          </div>

          <p className="text-xs text-[#EFE6D8]/80">
            © 2026 بن الصباح - جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      {/* Interactive WhatsApp Preview Modal */}
      <OrderPreviewModal
        isOpen={modalOpen}
        product={selectedProduct}
        onClose={closeWhatsAppPreview}
      />

      {/* Accessible Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 start-5 z-50 flex max-w-sm items-center gap-3 rounded-xl border border-[#C88A4B]/30 bg-[#2C1A12] px-4 py-3 text-sm font-semibold text-[#FAF6F0] shadow-xl"
        >
          <CoffeeBeanIcon className="h-4 w-4 shrink-0 text-[#C88A4B]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
