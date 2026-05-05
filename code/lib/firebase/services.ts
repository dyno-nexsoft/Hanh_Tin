/// Firestore service functions — tách biệt data layer khỏi UI.
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  getDocs,
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
