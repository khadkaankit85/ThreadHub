import { View, Text } from "./Themed";
import { Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { likedIcon, unlikedIcon } from "@/assets";
import { useState, useRef } from "react";
import Toast from "react-native-root-toast";
import swipeDirections, {
  GestureRecognizerProps,
} from "react-native-swipe-gestures";
import GestureRecognizer from "react-native-swipe-gestures";
import { Jokes } from "@/assets/jokes.ts";

interface CardProps {
  data: jokes;
}

interface jokes {}
const Card = ({ data }: CardProps) => {
  const [likedPost, setLikedPost] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const toastID = useRef<string | null>(null);

  function toggleLike() {
    // Toggle the liked state
    setLikedPost((prev) => !prev);

    // Hide the previous toast if it exists
    if (toastID.current !== null) {
      Toast.hide(toastID.current);
    }

    // Show a new toast and save its ID
    const newToastID = Toast.show(
      likedPost ? "Removed from Favourites" : "Added to Favourites",
      {
        duration: Toast.durations.LONG,
        position: -100,
        onHide: () => {
          toastID.current = null;
        },
      }
    );

    toastID.current = newToastID;

    // swipe gesture handler
  }

  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        setCurrentCardIndex((prev) => prev + 1);
      }}
      onSwipeRight={() => {
        if (currentCardIndex === 0) return;
        setCurrentCardIndex((prev) => prev - 1);
      }}
      onSwipeUp={() => {
        console.log("swiped up");
      }}
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
        <Text>{Jokes[currentCardIndex]["setup"]}</Text>
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
          }}
        >
          <SvgXml
            xml={likedPost ? likedIcon : unlikedIcon}
            width={40}
            height={40}
          />
        </Pressable>
      </View>
    </GestureRecognizer>
  );
};

export default Card;
