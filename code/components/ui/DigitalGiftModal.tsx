"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, QrCode, X, Copy, Check } from "lucide-react";
import { BANK, BRIDE, GROOM } from "@/lib/constants/wedding-data";

interface DigitalGiftModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function DigitalGiftModal({
  isOpen,
  onClose,
}: DigitalGiftModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-wedding-dark/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className="relative rounded-3xl overflow-hidden max-w-[360px] w-full bg-white shadow-2xl"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-8 text-center bg-wedding-red relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-4xl text-white font-script">Mừng Cưới</h3>
              <p className="text-white/70 text-[10px] tracking-[0.3em] uppercase mt-2 font-serif">
                {BRIDE.name} & {GROOM.name}
              </p>
            </div>

            <div className="p-6 text-center space-y-6">
              {/* QR Code */}
              <div className="relative aspect-square max-w-[200px] mx-auto p-4 border border-wedding-red/10 rounded-2xl bg-wedding-cream-dark/30">
                <div className="w-full h-full flex flex-col items-center justify-center text-wedding-red/20">
                  <QrCode className="w-16 h-16 mb-2" />
                  <span className="text-[9px] uppercase tracking-[0.2em] font-serif font-bold opacity-40">
                    QR Payment
                  </span>
                </div>
              </div>

              {/* Bank info */}
              <div className="space-y-4 text-left border-t border-wedding-red/5 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-wedding-red/5 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-wedding-red" />
                  </div>
                  <div>
                    <p className="text-wedding-gray text-[9px] uppercase tracking-widest font-serif">
                      Ngân hàng
                    </p>
                    <p className="text-wedding-red font-bold text-base font-serif">
                      {BANK.bankName}
                    </p>
                  </div>
                </div>

                <div className="pl-13">
                  <p className="text-wedding-gray text-[9px] uppercase tracking-widest font-serif">
                    Chủ tài khoản
                  </p>
                  <p className="text-wedding-red font-bold text-base uppercase tracking-wider font-serif">
                    {BANK.owner}
                  </p>
                </div>

                <div className="pl-13 relative group">
                  <p className="text-wedding-gray text-[9px] uppercase tracking-widest font-serif">
                    Số tài khoản
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-wedding-red font-bold text-2xl tracking-tighter font-sans">
                      {BANK.number}
                    </p>
                    <button
                      onClick={handleCopy}
                      className="p-1.5 bg-wedding-red/5 hover:bg-wedding-red/10 rounded-lg transition-colors group/btn relative"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-wedding-red" />
                      )}
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-8 left-1/2 -translate-x-1/2 bg-wedding-dark text-white text-[10px] px-2 py-1 rounded whitespace-nowrap"
                          >
                            Đã sao chép
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              </div>

              {/* Fix lỗi xuống dòng - Căn lề và dùng size phù hợp */}
              <p className="text-wedding-gray text-[11px] italic font-serif leading-relaxed px-2 border-t border-wedding-red/5 pt-4">
                "Chân thành cảm ơn bạn đã chia sẻ niềm vui!"
              </p>

              <button
                onClick={onClose}
                className="w-full py-4 bg-wedding-red text-white font-sans font-bold uppercase tracking-widest text-xs hover:bg-wedding-red-accent transition-all shadow-lg rounded-xl"
              >
                Đóng
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
