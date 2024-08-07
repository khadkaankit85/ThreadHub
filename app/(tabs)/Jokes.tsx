import { StyleSheet, FlatList } from "react-native";
import { View, Text } from "@/components/Themed";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { useNavigation } from "expo-router";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
type JokesTabParamList = {
  general: {
    id: number;
    category: string;
  };
  programming: {
    id: number;
    category: string;
  };
};

type GeneralNavigationProp = BottomTabNavigationProp<
  JokesTabParamList,
  "general"
>;

export default function TabOneScreen() {
  const Theme = useColorScheme();
  // const navigation = useNavigation<MaterialBottomTabNavigationProp<generalPageParams,"link">>();
  const navigation = useNavigation<GeneralNavigationProp>();

  return (
    <FlatList
      style={{
        width: "100%",
        padding: 10,
      }}
      data={[
        { id: 1, category: "General" },
        {
          id: 2,
          category: "Programming",
          link: "jokes/programming",
        },
      ]}
      renderItem={({ item }) => (
        <PaperProvider>
          <Button
            buttonColor="black"
            rippleColor={"#7E7776"}
            mode="outlined"
            style={{
              marginBottom: 10,
            }}
            onPress={() => {
              navigation.navigate("jokes/general" as keyof JokesTabParamList, {
                id: item.id,
                category: item.category,
              });
            }}
          >
            <View
              style={{
                borderWidth: 1,
                height: 45,
                marginBottom: 10,
                borderRadius: 15,
                flex: 1,
                width: "100%",
                backgroundColor: Theme === "light" ? "black" : "black",
              }}
            >
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: "monospace",
                  marginVertical: "auto",
                  fontSize: 15,
                  color: "white",
                }}
              >
                {item.category}
              </Text>
            </View>
          </Button>
        </PaperProvider>
      )}
    />
  );
}
