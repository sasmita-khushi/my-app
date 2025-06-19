import Product from "../ui/product";
import { View } from "react-native";
export default function ProductPage() {
  return (
    <View className="flex-1">
      <Product PRODUCTS={PRODUCTS} />
    </View>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
  { category: "Vegetables", price: "$3", stocked: false, name: "Carrot" },
  { category: "Fruits", price: "$1", stocked: false, name: "orange" },
  { category: "Fruits", price: "$1", stocked: true, name: "grapes" },
];
