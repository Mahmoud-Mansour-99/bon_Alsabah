import { useEffect, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { CoffeeProduct, GRIND_OPTIONS } from '../data/coffeeData';
import { WhatsAppIcon } from './Icons';

interface OrderPreviewModalProps {
  isOpen: boolean;
  product: CoffeeProduct | null;
  onClose: () => void;
}

export function OrderPreviewModal({
  isOpen,
  product,
  onClose,
}: OrderPreviewModalProps) {
  const [selectedGrind, setSelectedGrind] = useState<string>(
    product?.defaultGrind ?? GRIND_OPTIONS[0]
  );

  useEffect(() => {
    if (product) {
      setSelectedGrind(product.defaultGrind);
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C1A12]/55 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#2C1A12]/10 bg-[#FAF6F0] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#157A40]/12 text-[#157A40]">
              <WhatsAppIcon className="h-6 w-6" />
            </span>
            <div>
              <h3
                id="order-modal-title"
                className="text-lg font-bold text-[#2C1A12]"
              >
                معاينة الطلب عبر واتساب
              </h3>
              <p className="text-xs font-medium text-[#5C3A21]">
                بن الصباح · القاهرة والجيزة
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق النافذة"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#3D2B22] transition-colors duration-150 hover:bg-[#EFE6D8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-[#2C1A12]/10 bg-[#EFE6D8]/75 p-4">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#157A40]" />
            <p className="text-sm font-semibold leading-relaxed text-[#2C1A12]">
              سيتم تفعيل الطلب المباشر عبر واتساب قريباً! (هذا نموذج تجريبي
              للعرض)
            </p>
          </div>
        </div>

        {product && (
          <div className="mt-5 space-y-4 border-t border-[#2C1A12]/10 pt-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#5C3A21]">
                  المنتج المختار
                </p>
                <p className="mt-0.5 text-base font-bold text-[#2C1A12]">
                  {product.title}
                </p>
                <p className="text-xs text-[#3D2B22]">
                  الوزن: {product.weight}
                </p>
              </div>
              <div className="text-left">
                <span className="text-lg font-bold tabular-nums text-[#2C1A12]">
                  {product.price} {product.currency}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-[#5C3A21]">
                اختر درجة الطحن المفضلة (معاينة):
              </p>
              <div className="flex flex-wrap gap-2">
                {GRIND_OPTIONS.map((grind) => {
                  const isActive = selectedGrind === grind;
                  return (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`min-h-[38px] rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21] ${
                        isActive
                          ? 'border-[#5C3A21] bg-[#5C3A21] text-[#FAF6F0]'
                          : 'border-[#2C1A12]/15 bg-white/70 text-[#3D2B22] hover:bg-[#EFE6D8]'
                      }`}
                    >
                      {grind}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#5C3A21] px-5 py-2.5 text-sm font-semibold text-[#FAF6F0] transition-colors duration-150 hover:bg-[#2C1A12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5C3A21]"
          >
            حسناً، فهمت
          </button>
        </div>
      </div>
    </div>
  );
}
