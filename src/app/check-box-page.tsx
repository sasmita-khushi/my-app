import { lazy, useState, Suspense } from "react";
import { View, Text, Pressable } from "react-native";
import CheckBox from "../ui/check-box";

const LazyA = lazy(() => import("../../components/a"));
const LazyB = lazy(() => import("../../components/b"));

export default function CheckBoxPage() {
  const [checked, setChecked] = useState(false);
  const [showData, setShowData] = useState(false);

  const toggleCheck = () => {
    setChecked((prev) => !prev);
  };

  return (
    <View>
      <CheckBox isChecked={checked} onChange={toggleCheck} />
      <Suspense fallback={<Loading />}>
        {showData && (
          <>
            <LazyA />
            <LazyB />
          </>
        )}
      </Suspense>
      <Pressable
        onPress={() => setShowData((prev) => !prev)}
        className="ml-1 h-10 w-40 items-center justify-center rounded bg-blue-500 p-1"
      >
        <Text>Toggle Data</Text>
      </Pressable>
    </View>
  );
}

function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
