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
  useEffect(() => setData('theme', 'light'), []);

  const { setProfile, setLoading, connectSocket, disconnectSocket, socket } =
    useAuthStore();
  const profileQuery = useProfileQuery();

  useEffect(() => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await profileQuery.refetch();
        const profile = response.data?.data;
        if (profile) setProfile(profile);
      } catch (error) {
        logger.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const s = connectSocket(accessToken);

    const pingInterval = setInterval(() => {
      if (s?.connected) {
        s.emit('ping', { message: 'ping from client' });
      }
    }, 30 * 1000);

    const handleUnload = () => {
      s?.disconnect();
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      clearInterval(pingInterval);
      window.removeEventListener('beforeunload', handleUnload);
      disconnectSocket();
    };
  }, []);

  return <>{children}</>;
}
