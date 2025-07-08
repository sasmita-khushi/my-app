import { View, Button, Text } from "react-native";
import { create } from "zustand";

type StoreState = {
  count: number;
  inc: () => void;
  dec: () => void;
};

const useStore = create<StoreState>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state: any) => ({ count: state.count - 1 })),
}));

export default function Counter() {
  const { count, inc, dec } = useStore();
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={inc} />
      <Button title="Decrement" onPress={dec} />
    </View>
  );
}
