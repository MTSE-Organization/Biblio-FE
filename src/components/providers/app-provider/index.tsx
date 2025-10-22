'use client';

import { logger } from '@/logger';
import { useProfileQuery } from '@/queries';
import { useAuthStore } from '@/store';
import { getAccessTokenFromLocalStorage, setData } from '@/utils';
import { useEffect } from 'react';

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => setData('theme', 'light'));
  const { setProfile, setLoading, connectSocket } = useAuthStore();
  const profileQuery = useProfileQuery();

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const handleGetProfile = async () => {
      setLoading(true);
      try {
        const response = await profileQuery.refetch();
        const profile = response.data?.data;
        setProfile(profile!);
      } catch (error) {
        logger.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    handleGetProfile();

    // connectSocket(accessToken);
    // const interval = setInterval(() => connectSocket(accessToken), 50 * 1000);
    // return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}
