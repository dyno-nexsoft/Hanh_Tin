import type { Timestamp } from 'firebase/firestore';

export type WeddingSide = 'bride' | 'groom';

/// Theme tối/sáng cho mỗi slide — dùng bởi WeddingPage và InteractionSidebar
export type WeddingSlideBg = 'light' | 'dark';

export interface Event {
  id: string;
  title: string;
  time: string;
  date: string;
  venue: string;
  address: string;
  icon: string;
}

export interface Venue {
  name: string;
  address: string;
  mapsUrl: string;
  embedUrl: string;
}

export interface BankAccount {
  owner: string;
  number: string;
  bankName: string;
  bankId: string;
  qrImage: string;
}

export interface SideData {
  sideName: string;
  ceremonyTitle: string;
  weddingDate: Date;
  lunarDate: string;
  events: Event[];
  venue: Venue;
  bank: BankAccount;
}

export interface Person {
  name: string;
  fullName: string;
  father: string;
  mother: string;
  title: string;
  photo: string;
}

export interface WishData {
  name: string;
  message: string;
  /// Timestamp từ Firestore server — null nếu chưa được persist
  createdAt?: Timestamp | null;
}

