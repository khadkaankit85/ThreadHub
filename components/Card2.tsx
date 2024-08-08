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
import Svg, { Path } from "react-native-svg";

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
      useNativeDriver: false,
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
    console.log("next joke");
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
      <Pressable onPress={toggleLike}>
        <Pressable onPress={toggleLike}>
          <Svg width="100" height="100" viewBox="0 0 256 256">
            <Path
              d="M25,47.30078l-0.64062,-0.53125c-1.21484,-1.01562 -2.85937,-2.11719 -4.76562,-3.39062c-7.42578,-4.97266 -17.59375,-11.77734 -17.59375,-23.37891c0,-7.16797 5.83203,-13 13,-13c3.89453,0 7.54297,1.73438 10,4.69922c2.45703,-2.96484 6.10547,-4.69922 10,-4.69922c7.16797,0 13,5.83203 13,13c0,11.60156 -10.16797,18.40625 -17.59375,23.37891c-1.90625,1.27344 -3.55078,2.375 -4.76562,3.39063z"
              fill="#ffffff"
            />
          </Svg>
        </Pressable>
        <Pressable onPress={toggleLike}>
          <SvgXml xml={previousIcon} width={43} height={43} />
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Card;
