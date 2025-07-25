import { create } from "zustand";

type StoreState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  setCount: (countValue: number) => void;
};

const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  decrement: () =>
    set((state) => ({
      count: state.count - 1,
    })),

  setCount: (countValue) => {
    return set(() => ({
      count: countValue,
    }));
  },
}));

export default useStore;
