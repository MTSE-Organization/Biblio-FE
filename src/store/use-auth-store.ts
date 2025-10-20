import { AuthStoreType, ProfileType } from '@/types';
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { AppConstants } from '@/constants';

const useAuthStore = create<AuthStoreType>((set, get) => ({
  isAuthenticated: false,
  profile: null,
  loading: true,
  socket: null,
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setProfile: (profile: ProfileType | null) => set({ profile }),
  setLoading: (loading: boolean) => set({ loading }),
  connectSocket: (token: string) => {
    const socket: Socket = io(AppConstants.socketUrl, {
      auth: {
        token: `Bearer ${token}`
      },
      transports: ['websocket']
    });
    socket.connect();
    set({ socket });
    socket.on('connect', () => {
      socket.emit('ping', { message: 'ping from client' });
    });
  },
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
    }
  }
}));

export default useAuthStore;
