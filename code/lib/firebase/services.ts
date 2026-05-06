/// Firestore service functions — tách biệt data layer khỏi UI.
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  where,
  increment,
} from 'firebase/firestore';
import { db } from '@/lib/config/firebase';

import { WishData } from '@/lib/types';

/// Gửi lời chúc mừng từ khách dự.
/// Tự động thêm timestamp từ phía server để đảm bảo tính nhất quán.
export async function addWish(data: Omit<WishData, 'createdAt'>): Promise<void> {
  await addDoc(collection(db, 'wishes'), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/// Lấy 20 lời chúc mới nhất để hiển thị trên website.
export async function getWishes(): Promise<WishData[]> {
  const q = query(
    collection(db, 'wishes'),
    orderBy('createdAt', 'desc'),
    limit(20),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data() as WishData);
}

/// Guest Links Management
export interface GuestLinkData {
  id?: string;
  name: string;
  side: 'bride' | 'groom';
  url: string;
  viewCount?: number;
  lastViewedAt?: any;
  createdAt?: any;
}

export async function addGuestLink(data: Omit<GuestLinkData, 'createdAt' | 'viewCount' | 'lastViewedAt'>): Promise<void> {
  await addDoc(collection(db, 'guest_links'), {
    ...data,
    viewCount: 0,
    createdAt: serverTimestamp(),
  });
}

export async function getGuestLinks(): Promise<GuestLinkData[]> {
  const q = query(
    collection(db, 'guest_links'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data()
  } as GuestLinkData));
}

export async function deleteGuestLink(id: string): Promise<void> {
  await deleteDoc(doc(db, 'guest_links', id));
}

export async function trackGuestLinkView(name: string, side: string): Promise<void> {
  const q = query(
    collection(db, 'guest_links'),
    where('name', '==', name),
    where('side', '==', side),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const guestDoc = snapshot.docs[0];
    await updateDoc(doc(db, 'guest_links', guestDoc.id), {
      viewCount: increment(1),
      lastViewedAt: serverTimestamp(),
    });
  }
}
