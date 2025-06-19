import { View, Text } from "react-native";
import TextBox from "./text-box";
import CheckBox from "./check-box";
import { useState } from "react";

export default function Product(props: { PRODUCTS: any[] }) {
  const { PRODUCTS } = props;
  const [checked, setChecked] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleCheck = () => {
    setChecked((prev) => !prev);
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesStock = checked ? product.stocked : true;
    return matchesSearch && matchesStock;
  });

  // 🔄 changed: Create separate arrays for each category
  const fruits = filteredProducts.filter((p) => p.category === "Fruits"); // 🔄
  const vegetables = filteredProducts.filter(
    (p) => p.category === "Vegetables",
  ); // 🔄

  return (
    <MainContainer className="flex-1 items-center justify-center">
      <Container className="my-5 h-3/4 w-2/5 flex-1 items-center rounded-md border border-gray-400">
        <TopBox className="mt-6 h-32 w-[500px] rounded-md border border-gray-400">
          <TextBox
            style={{ marginLeft: 20, marginRight: 20 }}
            placeholder="search..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <View className="flex-row">
            <CheckBox isChecked={checked} onChange={toggleCheck} />
            <Text className="mt-3">Only Show Product in Stock</Text>
          </View>
        </TopBox>

        <BottomBox className="mt-6 h-[570px] w-[500px] rounded-md border border-gray-400">
          <View className="mt-1 flex-col">
            {/* 🔄 changed: Render Fruits only if there are items */}
            {fruits.length > 0 && ( // 🔄
              <View className="mt-3 flex-1">
                <Text className="ml-5 text-2xl font-bold text-green-600">
                  Fruits
                </Text>
                {fruits.map(
                  (
                    product,
                    i, // 🔄 changed from filteredProducts
                  ) => (
                    <View
                      key={i}
                      className="flex-row justify-between px-5 py-1"
                    >
                      <Text
                        className={[
                          "flex-col text-lg",
                          !product.stocked ? "text-red-500" : "text-black",
                        ].join(" ")}
                      >
                        {product.name}
                      </Text>
                      <Text className="text-md ml-10 flex-col">
                        {product.price}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            )}

            {/* 🔄 changed: Render Vegetables only if there are items */}
            {vegetables.length > 0 && ( // 🔄
              <View className="mt-3">
                <Text className="ml-5 text-2xl font-bold text-green-600">
                  Vegetables
                </Text>
                {vegetables.map(
                  (
                    product,
                    i, // 🔄 changed from filteredProducts
                  ) => (
                    <View
                      key={i}
                      className="flex-row justify-between px-5 py-1"
                    >
                      <Text
                        className={[
                          "flex-col text-lg",
                          !product.stocked ? "text-red-500" : "text-black",
                        ].join(" ")}
                      >
                        {product.name}
                      </Text>
                      <Text className="text-md ml-10 flex-col">
                        {product.price}
                      </Text>
                    </View>
                  ),
                )}
              </View>
            )}

            {/* 🔄 changed: Add "No products found" if both are empty */}
            {fruits.length === 0 &&
              vegetables.length === 0 && ( // 🔄
                <Text className="mt-10 text-center text-lg text-red-500">
                  No products found.
                </Text>
              )}
          </View>
        </BottomBox>
      </Container>
    </MainContainer>
  );
}

const MainContainer = View;
const Container = View;
const TopBox = View;
const BottomBox = View;
