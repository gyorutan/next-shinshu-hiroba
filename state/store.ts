import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  userLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  userImageUrl: string | null;
  setUserLoggedIn: (userLoggedIn: boolean) => void;
  setUsername: (username: string | null) => void;
  setUserId: (userId: string | null) => void;
  setUserImageUrl: (userId: string | null) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      userLoggedIn: false,
      setUserLoggedIn: (userLoggedIn: boolean) =>
        set(() => ({ userLoggedIn: userLoggedIn })),
      username: null,
      setUsername: (username: string | null) =>
        set(() => ({ username: username })),
      userId: null,
      setUserId: (userId: string | null) => set(() => ({ userId: userId })),
      userImageUrl: null,
      setUserImageUrl: (userImageUrl: string | null) =>
        set(() => ({ userImageUrl: userImageUrl })),
    }),
    {
      name: "AuthStorage",
    }
  )
);

export default useAuthStore;
