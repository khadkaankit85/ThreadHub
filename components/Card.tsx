import { View, Text } from "./Themed";
import { Pressable, Animated, Alert } from "react-native";
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
  const [setupIsVisible, setSetupIsVisible] = useState(true);
  const [punchlineIsVisible, setPunchlineIsVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<any>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === null || status?.granted === false) {
      requestPermission();
    }
  }, [status, requestPermission]);

  useEffect(() => {
    setSetupIsVisible(true);
    setPunchlineIsVisible(false);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentCardIndex]);

  async function saveImage() {
    if (!status?.granted) {
      Alert.alert(
        "Permission Required",
        "Please enable the required permissions in your app settings.",
        [
          { text: "Go to Settings", onPress: () => Linking.openSettings() },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }

    try {
      setPunchlineIsVisible(true);
      setSetupIsVisible(true);

      setTimeout(async () => {
        const image = await captureRef(imageRef, { height: 440, quality: 1 });
        await MediaLibrary.saveToLibraryAsync(image);
        if (image) {
          Alert.alert("Image saved to gallery");
        }
      }, 500); // Added delay to ensure the image is captured correctly
    } catch {
      Alert.alert("Error saving image to gallery");
    }
  }

  function toggleJoke() {
    setPunchlineIsVisible((prev) => !prev);
  }

  function getPreviousJoke() {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setSetupIsVisible(true);
      fadeAnim.setValue(0);
    }
  }

  function getNextJoke() {
    if (currentCardIndex < Jokes.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setSetupIsVisible(true);
      fadeAnim.setValue(0);
    }
  }

  function toggleLike() {
    setLikedPost((prev) => !prev);

    if (toastID.current) {
      Toast.hide(toastID.current);
    }

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
      onSwipeLeft={getNextJoke}
      onSwipeRight={getPreviousJoke}
      onSwipeUp={toggleJoke}
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
        onPress={toggleJoke}
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
          {setupIsVisible && Jokes[currentCardIndex]?.setup}
          {punchlineIsVisible && "\n" + Jokes[currentCardIndex]?.punchline}
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
        <Pressable onPress={getPreviousJoke}>
          <SvgXml xml={previousIcon} width={43} height={43} />
        </Pressable>
        <Pressable onPress={toggleLike}></Pressable>
        <Pressable onPress={toggleJoke}>
          <SvgXml xml={toggleSetupIcon} width={35} height={35} />
        </Pressable>
        <Pressable onPress={saveImage}>
          <SvgXml xml={downloadIcon} width={40} height={40} />
        </Pressable>
        <Pressable onPress={getNextJoke}>
          <SvgXml xml={nextIcon} width={43} height={43} />
        </Pressable>
      </View>
    </GestureRecognizer>
  );
};

export default Card;
