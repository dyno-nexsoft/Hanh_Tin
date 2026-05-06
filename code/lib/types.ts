export type WeddingSide = 'bride' | 'groom';

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
  createdAt?: any;
}

