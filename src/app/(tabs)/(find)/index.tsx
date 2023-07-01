import { useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { MoviePoster } from "@/components/Posters";
import { View } from "@/components/Themed";
import { useMovieData } from "@/getMovies";
import { MovieOption } from "@/types";

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
      data={results}
      renderItem={({ item }) => <MoviePoster item={item} />}
      ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
      ListEmptyComponent={() => <ActivityIndicator />}
      columnWrapperStyle={{ columnGap: 16 }}
      contentContainerStyle={{ padding: 16 }}
      keyExtractor={(item) => item?.id?.toString()}
      numColumns={2}
      onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
      onEndReachedThreshold={1.5}
    />
  );
}
