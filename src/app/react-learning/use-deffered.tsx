import React, { useState, useDeferredValue } from "react";
import { View, Text, TextInput } from "react-native";

export default function App() {
  const data = [
    "Alice Smith",
    "Bob Johnson",
    "Charlie Brown",
    "David Wilson",
    "Emily Davis",
    "Frank Miller",
    "George Smith",
    "Hannah Johnson",
    "Isla Brown",
    "Jack Wilson",
    "Kathy Davis",
    "Liam Smith",
    "Mia Johnson",
    "Noah Brown",
    "Olivia Wilson",
    "Paul Davis",
    "Quinn Smith",
    "Rachel Johnson",
    "Sam Brown",
    "Tina Wilson",
    "Uma Davis",
    "Vera Smith",
    "Will Johnson",
    "Xander Brown",
    "Yara Wilson",
    "Zoe Davis",
    "Zack Johnson",
    "Aaron Smith",
    "Bella Davis",
    "Cathy Brown",
    "Diana Wilson",
    "Ethan Smith",
    "Fiona Johnson",
    "Gina Brown",
    "Henry Wilson",
    "Ivy Davis",
    "Jake Smith",
    "Kara Johnson",
    "Leo Brown",
    "Mason Wilson",
    "Nina Davis",
    "Oscar Brown",
    "Penny Wilson",
    "Quincy Davis",
  ];

  return (
    <View className="flex-1 items-center pt-16">
      <Text className="mb-3 rounded-md bg-sky-400 p-1 text-lg">
        Search Example
      </Text>
      <SearchComponent data={data} />
    </View>
  );
}

function SearchComponent({ data }: { data: string[] }) {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input);

  const filteredData = data.filter((item: string) =>
    item.toLowerCase().includes(deferredInput.toLowerCase()),
  );

  return (
    <View>
      <TextInput
        className="rounded rounded-lg border p-4"
        value={input}
        onChangeText={setInput}
        placeholder="Type a name..."
      />
      <View className="mt-6">
        {filteredData.map((item: string, index: number) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    </View>
  );
}
