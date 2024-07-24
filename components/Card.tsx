import { View, Text } from "./Themed";
import { Pressable, Animated, Easing, Alert } from "react-native";
import { SvgXml } from "react-native-svg";
import {
  downloadIcon,
  likedIcon,
  nextIcon,
  previousIcon,
  toggleSetupIcon,
  unlikedIcon,
} from "@/assets";
import { useState, useRef, useEffect } from "react";
import Toast from "react-native-root-toast";
import GestureRecognizer from "react-native-swipe-gestures";
import { Jokes } from "@/assets/jokes.ts";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import * as Linking from "expo-linking";

interface CardProps {
  Jokes: Jokes;
}

const Card = ({ Jokes }: CardProps) => {
  const [likedPost, setLikedPost] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const toastID = useRef<string | null>(null);

  const [setupIsVisible, setsetupIsVisible] = useState(true);
  const [punchlineIsVisible, setpunchlineIsVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<any>(null);

  useEffect(() => {
    if (status === null || status?.granted === false) {
      requestPermission();
    }
  }, [status, requestPermission]);

  useEffect(() => {
    setsetupIsVisible(true);
    setpunchlineIsVisible(false);
  }, [currentCardIndex, Jokes]);

  async function saveImage() {
    if (!status?.canAskAgain) {
      // Provide instructions to the user to enable permissions manually
      Alert.alert(
        "Permission Required",
        "Please enable the required permissions in your app settings.",
        [
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]
      );
    }

    if (status?.granted) {
      console.log("Saving image to gallery...");
      try {
        setpunchlineIsVisible(true);
        setsetupIsVisible(true);

        setTimeout(async () => {
          const image = await captureRef(imageRef, {
            height: 440,
            quality: 1,
          });

          await MediaLibrary.saveToLibraryAsync(image);
          if (image) {
            Alert.alert("Image saved to gallery");
          }
        });
      } catch (e) {
        alert("Error saving image to gallery");
      }
    }
  }

  function toggleJoke() {
    setpunchlineIsVisible((prev) => !prev);
  }

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity value: 0 (completely transparent)

  useEffect(() => {
    console.log("Animating fade in...");
    Animated.timing(fadeAnim, {
      toValue: 1, // Target opacity value: 1 (completely opaque)
      duration: 1000, // Duration of the animation (1 second)
      useNativeDriver: true, // Use native driver for better performance
    }).start(() => {
      console.log("Fade in animation completed.");
    });
  }, [currentCardIndex]);

  // change jokes
  function getPreviousJoke() {
    if (currentCardIndex === 0) return;

    setCurrentCardIndex((prev) => prev - 1);
    setsetupIsVisible(true);
    fadeAnim.setValue(0); // Reset fadeAnim value to 0
  }
  function getNextJoke() {
    if (currentCardIndex === Jokes.length - 1) return;

    setCurrentCardIndex((prev) => prev + 1);
    setsetupIsVisible(true);
    fadeAnim.setValue(0); // Reset fadeAnim value to 0
  }

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
  }

  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        getNextJoke();
      }}
      onSwipeRight={() => {
        getPreviousJoke();
      }}
      onSwipeUp={() => {
        toggleJoke();
      }}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 500,
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <Pressable
        ref={imageRef}
        collapsable={false}
        onPress={() => {
          toggleJoke();
        }}
        style={{
          flex: 2 / 3,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Animated.Text
          style={{
            textAlign: "center",
            width: "100%",
            opacity: fadeAnim,
            color: "white",
          }}
        >
          {setupIsVisible && Jokes[currentCardIndex]["setup"]}

          {punchlineIsVisible && "\n" + Jokes[currentCardIndex]["punchline"]}
        </Animated.Text>
      </Pressable>
      <View
        style={{
          flex: 1 / 3,
          width: "100%",
          alignItems: "flex-start",
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
          backgroundColor: "rgba(100,0,100,0.1)",
          borderColor: "rgba(100,0,100,0.1)",
          marginTop: 10,
          paddingTop: 10,
        }}
      >
        <Pressable
          onPress={() => {
            getPreviousJoke();
          }}
        >
          <SvgXml xml={previousIcon} width={43} height={43} />
        </Pressable>
        <Pressable
          onPress={() => {
            toggleLike();
          }}
        >
          <SvgXml
            xml={likedPost ? likedIcon : unlikedIcon}
            width={38}
            height={38}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            toggleJoke();
          }}
        >
          <SvgXml xml={toggleSetupIcon} width={35} height={35} />
        </Pressable>
        <Pressable
          onPress={() => {
            saveImage();
          }}
        >
          <SvgXml xml={downloadIcon} width={40} height={40} />
        </Pressable>
        <Pressable
          onPress={() => {
            getNextJoke();
          }}
        >
          <SvgXml xml={nextIcon} width={43} height={43} />
        </Pressable>
      </View>
    </GestureRecognizer>
  );
};

export default Card;
