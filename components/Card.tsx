import { View, Text } from "./Themed";
import { Pressable, ToastAndroid, Platform } from "react-native";
import { SvgXml } from "react-native-svg";
import { likedIcon, unlikedIcon } from "@/assets";
import { useState } from "react";
interface CardProps {
  data: string;
}
const Card = ({ data }: CardProps) => {
  const [likedPost, setlikedPost] = useState(false);
  function toggleLike() {
    if (likedPost) {
      setlikedPost(false);
    } else {
      setlikedPost(true);
    }
  }
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
            toggleLike();
            if (Platform.OS === "android") {
              ToastAndroid.show(
                likedPost ? "Post Liked" : "Post Unliked",
                ToastAndroid.SHORT
              );
            }
            if (Platform.OS === "ios") {
              alert(likedPost ? "Post Liked" : "Post Unliked");
            }
          }}
        >
          <SvgXml
            xml={likedPost ? likedIcon : unlikedIcon}
            width={40}
            height={40}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Card;
