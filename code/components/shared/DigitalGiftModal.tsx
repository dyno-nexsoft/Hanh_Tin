"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CreditCard, X, Copy, Check } from "lucide-react";
import { WeddingSide } from "@/lib/types";
import { WEDDING_DATA, BRIDE, GROOM } from "@/lib/config/wedding";

interface DigitalGiftModalProps {
  readonly side: WeddingSide;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export default function DigitalGiftModal({
  side,
  isOpen,
  onClose,
}: DigitalGiftModalProps) {
  const [copied, setCopied] = useState(false);
  const bank = WEDDING_DATA[side].bank;
  
  const qrUrl = `https://img.vietqr.io/image/${bank.bankId}-${bank.number}-compact2.jpg?accountName=${encodeURIComponent(bank.owner)}&addInfo=${encodeURIComponent('Mung cuoi Hanh Tin')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bank.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            className="relative sm:rounded-[32px] overflow-hidden w-full h-full sm:h-auto sm:max-w-[380px] bg-white"
            style={{
              boxShadow: '0 24px 48px rgba(0,0,0,0.12)',
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 text-center relative bg-[#F5F5F7]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#E8E8ED] text-[#86868B] hover:bg-[#D1D1D6] hover:text-[#1D1D1F] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-[22px] font-bold font-sans tracking-tight text-[#1D1D1F]">
                Mừng Cưới
              </h3>
              <p className="text-[13px] font-medium text-[#86868B] mt-1">
                {BRIDE.name} & {GROOM.name}
              </p>
            </div>

            <div className="p-6 text-center space-y-6">
              {/* QR Code */}
              <div
                className="relative aspect-square max-w-[220px] mx-auto p-4 rounded-3xl bg-white"
                style={{
                  border: '1px solid rgba(0,0,0,0.05)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                }}
              >
                <Image
                  src={qrUrl}
                  alt="VietQR"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>

              {/* Bank info */}
              <div className="space-y-4 text-left pt-2">
                <div className="flex items-center gap-4 bg-[#F5F5F7] p-4 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CreditCard className="w-5 h-5 text-[#1D1D1F]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-[#86868B]">
                      Ngân hàng
                    </p>
                    <p className="font-bold text-[15px] text-[#1D1D1F] tracking-tight">
                      {bank.bankName}
                    </p>
                  </div>
                </div>

                <div className="bg-[#F5F5F7] p-4 rounded-2xl pl-4">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-[#86868B] mb-1">
                    Chủ tài khoản
                  </p>
                  <p className="font-bold text-[15px] text-[#1D1D1F] tracking-tight uppercase">
                    {bank.owner}
                  </p>
                </div>

                <div className="bg-[#F5F5F7] p-4 rounded-2xl pl-4 flex items-center justify-between group">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-[#86868B] mb-1">
                      Số tài khoản
                    </p>
                    <p className="font-bold text-[22px] tracking-tight text-[#1D1D1F] font-sans">
                      {bank.number}
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2.5 rounded-xl bg-white shadow-sm border border-black/5 hover:border-[#0071E3] transition-all relative"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-[#0071E3]" />
                    )}
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap bg-[#1D1D1F] text-white shadow-lg"
                        >
                          Đã sao chép
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <p className="text-[13px] font-medium text-[#86868B] pt-2">
                Chân thành cảm ơn bạn đã chia sẻ niềm vui!
              </p>

              <button
                onClick={onClose}
                className="w-full py-4 font-sans font-bold text-[15px] transition-all rounded-2xl bg-[#0071E3] text-white hover:bg-[#0077ED] active:scale-[0.98]"
              >
                Xong
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
