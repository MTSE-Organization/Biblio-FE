import { AuthStoreType, ProfileType } from '@/types';
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { AppConstants } from '@/constants';

let globalSocket: Socket | null = null; // giữ socket toàn cục, tránh connect nhiều lần

const useAuthStore = create<AuthStoreType>((set, get) => ({
  isAuthenticated: false,
  profile: null,
  loading: true,
  socket: null,

  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setProfile: (profile: ProfileType | null) => set({ profile }),
  setLoading: (loading: boolean) => set({ loading }),

  connectSocket: (token: string) => {
    if (globalSocket && globalSocket.connected) {
      set({ socket: globalSocket });
      return globalSocket;
    }

    const socket: Socket = io(AppConstants.socketUrl, {
      auth: { token: `Bearer ${token}` },
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log('[Socket] Connected');
      socket.emit('ping', { message: 'ping from client' });
    });

    socket.on('disconnect', (reason) => {
      console.log('[Socket] Disconnected:', reason);
    });

    globalSocket = socket;
    set({ socket });
    return socket;
  },

  disconnectSocket: () => {
    const socket = get().socket || globalSocket;
    if (socket) {
      console.log('[Socket] Disconnect manually');
      socket.disconnect();
      globalSocket = null;
      set({ socket: null });
    }
  }
}));

export default useAuthStore;
