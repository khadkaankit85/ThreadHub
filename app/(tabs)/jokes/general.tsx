import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import Card from "@/components/Card";
import { generalJokes, programmingJokes } from "@/assets/jokes";

type paramTypes = {
  id: number;
  category: "General" | "Programming";
};
const general = () => {
  const params: paramTypes = useLocalSearchParams() as unknown as paramTypes;
  const { id, category } = params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(100,0,100,0.1)",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginHorizontal: 10,
          padding: 10,
        }}
      >
        Category:
        {` ${category}`}
      </Text>

      <Card
        Jokes={category === "Programming" ? programmingJokes : generalJokes}
      />
    </View>
  );
};

export default general;
