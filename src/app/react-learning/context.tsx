import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const countContext = createContext({ count: 0, handleIncrement: () => {} });
export default countContext;

export function CountContextProvider(props: { children: any }) {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const value = useMemo(() => {
    return { count, handleIncrement };
  }, [count, handleIncrement]);

  //const value = { count, handleIncrement };
  return (
    <countContext.Provider value={value}>
      {props.children}
    </countContext.Provider>
  );
}

export const useCount = () => {
  return useContext(countContext);
};
