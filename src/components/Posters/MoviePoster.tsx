import { Image } from "expo-image";
import { Link, useSegments } from "expo-router";
import { PlatformColor, Pressable, StyleSheet } from "react-native";
import { human } from "react-native-typography";

import { PosterButton } from "./PosterButton";
import { Text, View } from "../Themed";

const style = {
  aspectRatio: "2/3",
  borderRadius: 8,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: PlatformColor("opaqueSeparator"),
};

export const MoviePoster = ({ item }) => {
  const [segment] = useSegments();

  return (
    <Link
      href={{
        pathname: `/${segment}/movie/[id]`,
        params: { id: item?.id ?? "", title: item?.title ?? "" },
      }}
      asChild
    >
      <Pressable style={{ flex: 1 }}>
        {item?.poster_path ? (
          <Image
            source={`https://image.tmdb.org/t/p/w780${item?.poster_path}`}
            style={style}
          >
            <PosterButton />
          </Image>
        ) : (
          <View style={[style, { justifyContent: "center" }]}>
            <Text
              style={[
                human.headline,
                {
                  alignSelf: "center",
                  padding: 8,
                  textAlign: "center",
                  position: "absolute",
                },
              ]}
            >
              {item?.title}
            </Text>
            <PosterButton />
          </View>
        )}
      </Pressable>
    </Link>
  );
};
