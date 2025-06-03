import { View, Text } from "react-native";
import { lazy, Suspense } from "react";

const LazyA = lazy(() => import("../../../components/a"));
const LazyB = lazy(() => import("../../../components/b"));

export default function SuspensePage() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mb-4 h-12 w-32 items-center justify-center rounded-md bg-yellow-300">
        <Text>Suspense Page</Text>
      </View>
      <Suspense fallback={<Loading />}>
        <LazyA />
      </Suspense>
      <Suspense fallback={<Glimmer />}>
        <LazyB />
      </Suspense>
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

function Glimmer() {
  return (
    <View className="rounded-lg bg-gray-100 p-4">
      <Text className="text-gray-500">Loading B...</Text>
    </View>
  );
}
