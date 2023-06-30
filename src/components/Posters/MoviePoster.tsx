import { Image } from "expo-image";
import { Link, useSegments } from "expo-router";
import { PlatformColor, Pressable } from "react-native";

import { PosterButton } from "./PosterButton";

export const MoviePoster = ({ movie }) => {
  const [segment] = useSegments();

  return (
    <Link href={`/${segment}/movie/${movie.id}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Image
          source={`https://image.tmdb.org/t/p/w780${movie?.poster_path}`}
          style={{
            aspectRatio: "2/3",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: PlatformColor("systemGray6"),
          }}
        >
          <PosterButton />
        </Image>
      </Pressable>
    </Link>
  );
};