import { useState } from "react";
import { View } from "react-native";
import AutoComplete from "../ui/auto-complete";
import MyAutoComplete from "../ui/auto-complete";
export default function AutoCompletePage() {
  const data = [
    {
      id: "1",
      name: "Apple",
    },
    {
      id: "2",
      name: "Banana",
    },
    {
      id: "3",
      name: "Cherry",
    },
    {
      id: "4",
      name: "Date",
    },
    {
      id: "5",
      name: "Elderberry",
    },
    {
      id: "6",
      name: "Fig",
    },
  ];

  const data2 = [
    {
      empId: 1,
      empName: "John Doe",
    },
    {
      empId: 2,
      empName: "Jane Smith",
    },
    {
      empId: 3,
      empName: "Alice Johnson",
    },
    {
      empId: 4,
      empName: "Bob Brown",
    },
    {
      empId: 5,
      empName: "Charlie Davis",
    },

    {
      empId: 6,
      empName: "Diana Prince",
    },
    {
      empId: 7,
      empName: "Ethan Hunt",
    },
    {
      empId: 8,
      empName: "Fiona Green",
    },
    {
      empId: 9,
      empName: "George White",
    },
    {
      empId: 10,
      empName: "Hannah Blue",
    },

    {
      empId: 11,
      empName: "Ian Black",
    },
    {
      empId: 12,
      empName: "Julia Red",
    },
  ];

  const [filteredData, setFilteredData] = useState<
    {
      empId: number;
      empName: string;
    }[]
  >([]);

  const handleChange = (e: any) => {
    // let a = filtered.slice(0, 6);Add commentMore actions
    const filltered = [];
    if (e.length > 0) {
      for (let i = 0; i < data2.length; i++) {
        if (data2[i].empName.toLowerCase().includes(e.toLowerCase())) {
          filltered.push(data2[i]);
          if (filltered.length === 6) {
            break;
          }
        }
        setFilteredData(filltered);
      }
    } else {
      setFilteredData([]);
    }
  };

  const handleAutoCompleteSelect = (selectedItem: any) => {
    console.log("Selected Item: ", selectedItem);
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* <AutoComplete data={data} label="Enter Your Name" /> */}
      <AutoComplete
        data={filteredData}
        label="Enter Your Name"
        propToBind="empName"
        id="empId"
        onChange={handleChange}
        onSelect={handleAutoCompleteSelect}
      />
    </View>
  );
}
