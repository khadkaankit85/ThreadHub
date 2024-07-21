import { View, Text } from "./Themed";
import { Pressable } from "react-native";
interface CardProps {
  data: string;
}
const Card = ({ data }: CardProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 500,
        backgroundColor: "blue",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          borderColor: "white",
          borderWidth: 10,
          flex: 2 / 3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          width: "100%",
        }}
      >
        <Text>{data}</Text>
      </View>
      <View
        style={{
          flex: 1 / 3,
          backgroundColor: "green",
          borderColor: "white",
          width: "100%",
          borderWidth: 10,
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {
            alert("You pressed me");
          }}
        >
          <Text>Press me</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Card;
