import { ProfileType } from '@/types/account.type';

export type AuthStoreType = {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
