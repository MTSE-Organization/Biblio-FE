export type AppLoadingStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  withLoading: <T>(promise: Promise<T>) => Promise<T>;
};
