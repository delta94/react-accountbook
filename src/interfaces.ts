import * as firebase from 'firebase/app';

export type User = firebase.User;

export type Provider =
  | firebase.auth.FacebookAuthProvider
  | firebase.auth.GoogleAuthProvider
  | firebase.auth.TwitterAuthProvider;

export type TagLabel =
  | 'その他'
  | '食費'
  | '家賃'
  | '電気代'
  | '水道代'
  | 'ガス代'
  | '電話'
  | '交通費';

export interface Store {
  expense: {
    expense: {
      id: string;
      date: Date;
      formatedDate: string;
      amount: number;
      tagLabel: TagLabel;
      tagIcon: string;
    }[];
  };
  isLoading: {
    isLoading: boolean;
  };
  device: {
    device: 'widescreen' | 'largeScreen' | 'computer' | 'tablet' | 'mobile';
  };
}

export interface StoreExpense {
  id: string;
  date: Date;
  formatedDate: string;
  amount: number;
  tagLabel: TagLabel;
  tagIcon: string;
}

export type StoreDevice = 'widescreen' | 'largeScreen' | 'computer' | 'tablet' | 'mobile';

export interface Expense {
  id: string;
  date: Date;
  formatedDate: string;
  amount: number;
  tag: string;
}
