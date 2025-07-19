import { createContext } from "react";
type CountContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};
export const countContext = createContext<CountContextType>({
  count: 0,
  setCount: () => {}, // default is no-op
});
