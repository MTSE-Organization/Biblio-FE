import { BaseSearchType } from '@/types/search.type';

export type NotificationResType = {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  accountId: number;
  type: number;
  data: string;
  seen: boolean;
  lastTimeRead: string;
  createdDate: string;
};

export type NotificationSearchType = {
  type?: number;
  accountId?: string;
  seen?: boolean;
} & BaseSearchType;
