import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BlurView } from "expo-blur";
import { PlatformColor } from "react-native";

import { View } from "../Themed";

export const PosterButton = () => (
  <View
    style={{
      width: 44,
      height: 44,
      borderRadius: 44,
      borderWidth: 1,
      borderColor: PlatformColor("systemGray6"),
      marginTop: "auto",
      marginLeft: "auto",
      marginRight: 4,
      marginBottom: 4,
      backgroundColor: "transparent",
      overflow: "hidden",
    }}
  >
    <BlurView
      style={{
        height: 44,
        width: 44,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name="plus" size={32} color="white" />
    </BlurView>
  </View>
);
