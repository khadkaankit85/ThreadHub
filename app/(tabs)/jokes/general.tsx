import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import Card from "@/components/Card";
const general = () => {
  const params = useLocalSearchParams();
  const { id, category } = params;

  return (
    <View
      style={{
        flex: 1,
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

      <Card data="this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 this is the fuking data lorem55 " />
    </View>
  );
};

export default general;
