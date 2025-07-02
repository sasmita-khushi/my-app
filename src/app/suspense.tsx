import { Suspense, lazy, useState } from "react";
import { View, Text } from "react-native";

const LazyComponent = lazy(() => import("../ui/check-box"));

export default function SuspensePage() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <View>
      <Suspense
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }
      >
        <LazyComponent isChecked={checked} onChange={handleChange} />
      </Suspense>
    </View>
  );
}
