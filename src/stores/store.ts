import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { create } from "zustand";

type Store = {
  user: FirebaseAuthTypes.User | null;
  setUser: (user: FirebaseAuthTypes.User | null) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
