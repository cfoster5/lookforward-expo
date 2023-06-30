import { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { MoviePoster } from "@/components/Posters";
import { View } from "@/components/Themed";
import { useMovieData } from "@/getMovies";
import { MovieOption } from "@/types";

function ListItem({ item: pair }) {
  return (
    <View style={{ flex: 1, flexDirection: "row", columnGap: 16 }}>
      {pair.map((movie) => (
        <MoviePoster key={movie?.id?.toString()} movie={movie} />
      ))}
    </View>
  );
}

function composePairedData(initialData) {
  return initialData?.reduce((result, value, index, array) => {
    if (index % 2 === 0) result.push(array.slice(index, index + 2));
    return result;
  }, []);
}

export default function TabOneScreen() {
  const [option, setOption] = useState<MovieOption>(MovieOption.ComingSoon);
  const [searchValue, setSearchValue] = useState("");
  // const debouncedSearch = useDebounce(searchValue, 400);
  const { data, fetchNextPage, hasNextPage, isLoading } = useMovieData(
    option,
    searchValue
  );

  const results = data?.pages.flatMap((page) => page.results);
  return (
    <FlatList
      data={composePairedData(results)}
      renderItem={ListItem}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      contentContainerStyle={{ padding: 16 }}
      // keyExtractor={(item) => item?.id?.toString()}
      onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
      onEndReachedThreshold={1.5}
      ListEmptyComponent={() => <ActivityIndicator />}
    />
  );
}
