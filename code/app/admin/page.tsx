'use client';

import { useState, useEffect } from 'react';
import { Copy, Share2, Trash2, CheckCircle2, UserPlus, Link as LinkIcon, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addGuestLink, deleteGuestLink, subscribeToGuestLinks, GuestLinkData } from '@/lib/firebase/services';

export default function AdminPage() {
  const [guestName, setGuestName] = useState('');
  const [side, setSide] = useState<'bride' | 'groom'>('bride');
  const [links, setLinks] = useState<GuestLinkData[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Lắng nghe dữ liệu Real-time từ Firebase
  useEffect(() => {
    const unsubscribe = subscribeToGuestLinks((data) => {
      setLinks(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const generateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    if (!trimmedName || submitting) return;

    // Kiểm tra trùng lặp
    const isDuplicate = links.some(
      (link) => link.name.toLowerCase() === trimmedName.toLowerCase() && link.side === side
    );

    if (isDuplicate) {
      setError(`Khách mời "${trimmedName}" đã có link cho bên ${side === 'bride' ? 'Nhà Gái' : 'Nhà Trai'} rồi!`);
      return;
    }

    setSubmitting(true);
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const encodedName = encodeURIComponent(trimmedName);
      const finalUrl = `${baseUrl}/${side}?to=${encodedName}`;

      await addGuestLink({
        name: trimmedName,
        side,
        url: finalUrl,
      });

      setGuestName('');
      // Không cần fetchLinks() nữa vì onSnapshot tự cập nhật
    } catch (e) {
      setError('Lỗi khi tạo link. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const shareLink = async (link: GuestLinkData) => {
    const shareData = {
      title: 'Thiệp Cưới Hạnh & Tín',
      text: `Trân trọng kính mời ${link.name} đến dự lễ cưới của chúng tôi!`,
      url: link.url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(link.url, link.id!);
        }
      }
    } else {
      copyToClipboard(link.url, link.id!);
    }
  };

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      setError('Không thể copy link. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa link này không?')) {
      try {
        await deleteGuestLink(id);
      } catch (e) {
        setError('Không thể xóa. Vui lòng thử lại.');
      }
    }
  };

  if (loading || !isAuthenticated) {
    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
                sessionStorage.setItem('admin_auth', 'true');
                setIsAuthenticated(true);
                setError(null);
              } else {
                setError('Mật khẩu không đúng!');
              }
            }}
            className="bg-white p-8 rounded-3xl shadow-xl shadow-wedding-red/5 border border-wedding-red/5 max-w-sm w-full space-y-6 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-red/5 mb-2">
              <LinkIcon className="text-wedding-red w-8 h-8" />
            </div>
            <h2 className="text-2xl font-serif text-wedding-red font-bold">Quản Trị Viên</h2>
            {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-wedding-red focus:ring-2 focus:ring-wedding-red/20 transition-all text-wedding-dark text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="w-full py-3 bg-wedding-red text-white rounded-xl font-bold hover:bg-wedding-red-accent transition-colors">
              Đăng Nhập
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-wedding-red animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wedding-red/5 mb-4">
            <LinkIcon className="text-wedding-red w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-wedding-red mb-2">Quản lý Khách mời</h1>
          <p className="text-wedding-gray text-sm italic">Dữ liệu được đồng bộ hóa với Firebase</p>
        </header>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex justify-between items-center"
            >
              <span className="text-sm font-medium">{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 text-xl font-bold px-2">
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
                disabled={submitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-wedding-dark">Thiệp bên nhà nào?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={submitting}
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
                  disabled={submitting}
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
              disabled={submitting}
              className="w-full py-4 bg-wedding-dark text-white rounded-xl font-bold hover:bg-wedding-red transition-colors shadow-lg shadow-wedding-dark/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <LinkIcon size={20} />}
              {submitting ? 'Đang tạo...' : 'Tạo Link Mời'}
            </button>
          </form>
        </motion.div>

        {/* Danh sách Link đã tạo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-serif font-bold text-wedding-dark">Danh sách link ({links.length})</h2>
          </div>
          
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
                      {link.viewCount && link.viewCount > 0 ? (
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-green-100 text-green-600">
                          Đã xem: {link.viewCount}
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-gray-100 text-gray-600">
                          Chưa xem
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-wedding-gray truncate font-mono opacity-60 block">{link.url}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                    <button
                      onClick={() => copyToClipboard(link.url, link.id!)}
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
                      onClick={() => handleDelete(link.id!)}
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
