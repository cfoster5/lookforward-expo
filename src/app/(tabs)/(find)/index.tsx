import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { ActivityIndicator, FlatList, PlatformColor } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { human } from "react-native-typography";

import { MoviePoster } from "@/components/Posters";
import { View } from "@/components/Themed";
import { useMovieData } from "@/getMovies";
import useDebounce from "@/hooks/useDebounce";
import { MovieOption } from "@/types";

export default function TabOneScreen() {
  const [option, setOption] = useState<MovieOption>(MovieOption.ComingSoon);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 400);
  const { data, fetchNextPage, hasNextPage, isLoading } = useMovieData(
    option,
    debouncedSearch
  );

  const results = data?.pages.flatMap((page) => page.results);
  return (
    <>
      <SafeAreaView edges={["top"]}>
        <SearchBar
          containerStyle={{
            backgroundColor: "transparent",
            paddingHorizontal: 8,
          }}
          inputContainerStyle={{
            backgroundColor: PlatformColor("tertiarySystemFill"),
            borderRadius: 10,
          }}
          inputStyle={[human.body, { color: PlatformColor("label") }]}
          onChangeText={setSearchValue}
          placeholder="Movies & People"
          placeholderTextColor={PlatformColor("secondaryLabel")}
          platform="ios"
          searchIcon={{ color: PlatformColor("secondaryLabel") }}
          value={searchValue}
          cancelButtonProps={{
            buttonTextStyle: { fontSize: human.bodyObject.fontSize },
          }}
        />
      </SafeAreaView>

      <FlatList
        // contentInsetAdjustmentBehavior="automatic"
        data={results}
        renderItem={({ item }) => <MoviePoster item={item} />}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        ListEmptyComponent={() => <ActivityIndicator />}
        columnWrapperStyle={{ columnGap: 16 }}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        keyExtractor={(item) => item?.id?.toString()}
        numColumns={2}
        onEndReached={() => (hasNextPage ? fetchNextPage() : null)}
        onEndReachedThreshold={1.5}
      />
    </>
  );
}
