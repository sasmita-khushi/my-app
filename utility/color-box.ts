// import { View } from "react-native";
// import { useMemo } from "react";

export default function generateUniqueColor(numOfColor: number) {
  let hash = new Set();
  let colors = [];

  while (hash.size <= numOfColor) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 50;
    const lightness = 50;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    if (!hash.has(color)) {
      hash.add(color);
      colors.push(color);
    }
  }
  return colors;
}

// export default function ColorBox() {
//   let num = 10;
//   let colorArr = useMemo(() => {
//     return generateUniqueColor(num);
//   }, [num]);
//   console.log(colorArr);

//   let boxes = colorArr.map((color) => {
//     return (
//       <View
//         style={{ backgroundColor: color }}
//         className=" w-20 h-20 mr-10 mb-10"
//         key={color}
//       ></View>
//     );
//   });
//   return <View className=" flex-wrap flex-row  ">{boxes}</View>;
// }
