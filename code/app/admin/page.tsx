'use client';

import { useState, useEffect } from 'react';
import { Copy, Share2, Trash2, CheckCircle2, UserPlus, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestLink {
  id: string;
  name: string;
  side: 'bride' | 'groom';
  url: string;
  createdAt: number;
}

export default function AdminPage() {
  const [guestName, setGuestName] = useState('');
  const [side, setSide] = useState<'bride' | 'groom'>('bride');
  const [links, setLinks] = useState<GuestLink[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Khởi tạo từ localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('wedding_guest_links');
    if (saved) {
      try {
        setLinks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse links from localStorage');
      }
    }
  }, []);

  // Lưu vào localStorage khi thay đổi
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('wedding_guest_links', JSON.stringify(links));
    }
  }, [links, mounted]);

  const generateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const encodedName = encodeURIComponent(guestName.trim());
    const finalUrl = `${baseUrl}/${side}?to=${encodedName}`;

    const newLink: GuestLink = {
      id: Math.random().toString(36).substring(2, 9),
      name: guestName.trim(),
      side,
      url: finalUrl,
      createdAt: Date.now(),
    };

    setLinks([newLink, ...links]);
    setGuestName('');
  };

  const shareLink = async (link: GuestLink) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Thiệp Cưới Hạnh & Tín',
          text: `Trân trọng kính mời ${link.name} đến dự lễ cưới của chúng tôi!`,
          url: link.url,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          window.open(link.url, '_blank');
        }
      }
    } else {
      window.open(link.url, '_blank');
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert('Không thể copy link. Vui lòng thử lại.');
    }
  };

  const deleteLink = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa link này không?')) {
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-red/5 mb-4">
            <LinkIcon className="text-wedding-red w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-wedding-red mb-2">Quản lý Khách mời</h1>
          <p className="text-wedding-gray text-sm italic">Tạo link mời riêng tư cho từng vị khách</p>
        </header>

        {/* Form Tạo Link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-wedding-red/5 border border-wedding-red/5 mb-10"
        >
          <form onSubmit={generateLink} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-wedding-dark flex items-center gap-2">
                <UserPlus size={16} className="text-wedding-red" />
                Tên khách mời
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Anh Chị Tám, Bạn Thân..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wedding-red focus:ring-2 focus:ring-wedding-red/20 outline-none transition-all text-wedding-dark"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-wedding-dark">Thiệp bên nhà nào?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSide('bride')}
                  className={`py-3 px-4 rounded-xl border transition-all font-medium ${
                    side === 'bride'
                      ? 'bg-wedding-red text-white border-wedding-red shadow-lg shadow-wedding-red/20'
                      : 'bg-white text-wedding-gray border-gray-200 hover:border-wedding-red/30'
                  }`}
                >
                  Nhà Gái (Bride)
                </button>
                <button
                  type="button"
                  onClick={() => setSide('groom')}
                  className={`py-3 px-4 rounded-xl border transition-all font-medium ${
                    side === 'groom'
                      ? 'bg-wedding-red text-white border-wedding-red shadow-lg shadow-wedding-red/20'
                      : 'bg-white text-wedding-gray border-gray-200 hover:border-wedding-red/30'
                  }`}
                >
                  Nhà Trai (Groom)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-wedding-dark text-white rounded-xl font-bold hover:bg-wedding-red transition-colors shadow-lg shadow-wedding-dark/10 flex items-center justify-center gap-2"
            >
              <LinkIcon size={20} />
              Tạo Link Mời
            </button>
          </form>
        </motion.div>

        {/* Danh sách Link đã tạo */}
        <div className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-wedding-dark px-2">Danh sách link đã tạo ({links.length})</h2>
          
          <AnimatePresence mode="popLayout">
            {links.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-wedding-gray italic">Chưa có link nào được tạo.</p>
              </div>
            ) : (
              links.map((link) => (
                <motion.div
                  key={link.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-hidden"
                >
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-wedding-dark truncate block">{link.name}</span>
                      <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        link.side === 'bride' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {link.side === 'bride' ? 'Nhà Gái' : 'Nhà Trai'}
                      </span>
                    </div>
                    <p className="text-xs text-wedding-gray truncate font-mono opacity-60 block">{link.url}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    <button
                      onClick={() => copyToClipboard(link.url, link.id)}
                      className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        copiedId === link.id
                          ? 'bg-green-500 text-white'
                          : 'bg-wedding-red/5 text-wedding-red hover:bg-wedding-red hover:text-white'
                      }`}
                    >
                      {copiedId === link.id ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span className="text-xs font-medium">Đã Copy</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span className="text-xs font-medium">Copy</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => shareLink(link)}
                      className="p-2 bg-wedding-dark text-white rounded-lg hover:bg-wedding-red transition-all flex items-center gap-2 px-3"
                      title="Chia sẻ"
                    >
                      <Share2 size={16} />
                      <span className="text-xs font-medium sm:hidden">Chia sẻ</span>
                    </button>

                    <button
                      onClick={() => deleteLink(link.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
