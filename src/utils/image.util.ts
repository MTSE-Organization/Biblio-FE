import { noImage } from '@/assets';
import { AppConstants } from '@/constants';

export const renderImageUrl = (url: string | undefined | null) => {
  if (!url) return noImage.src;
  return url.startsWith('https') ? url : `${AppConstants.contentRootUrl}${url}`;
};
