import { useInfiniteQuery } from "@tanstack/react-query";
import {
  UpcomingMovies,
  MoviesPlayingNow,
  PopularMovies,
  Search,
  MovieWithMediaType,
  PersonWithMediaType,
} from "tmdb-ts";

import { TmdbKey } from "@/constants/Keys";
import { MovieOption } from "@/types";

async function getMovies({
  pageParam = 1,
  option,
  searchValue,
}: {
  pageParam: number;
  option: MovieOption;
  searchValue?: string;
}) {
  const endpoints = {
    [MovieOption.ComingSoon]: `https://api.themoviedb.org/3/movie/upcoming?api_key=${TmdbKey}&language=en-US&page=${pageParam}&region=US`,
    [MovieOption.NowPlaying]: `https://api.themoviedb.org/3/movie/now_playing?api_key=${TmdbKey}&language=en-US&page=${pageParam}&region=US`,
    [MovieOption.Popular]: `https://api.themoviedb.org/3/movie/popular?api_key=${TmdbKey}&language=en-US&page=${pageParam}&region=US`,
    [MovieOption.Trending]: `https://api.themoviedb.org/3/trending/movie/day?api_key=${TmdbKey}&page=${pageParam}`,
    Search: `https://api.themoviedb.org/3/search/multi?api_key=${TmdbKey}&language=en-US&query=${searchValue}&page=${pageParam}&include_adult=false&region=US`,
  };
  const response = await fetch(
    !searchValue ? endpoints[option] : endpoints.Search
  );
  const json:
    | UpcomingMovies
    | MoviesPlayingNow
    | PopularMovies
    | Search<MovieWithMediaType | PersonWithMediaType> = await response.json();
  return json;
}

export function useMovieData(option: MovieOption, searchValue: string) {
  return useInfiniteQuery(
    ["movies", { option, searchValue }],
    ({ pageParam }) => getMovies({ pageParam, option, searchValue }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : undefined,
      // select: (movieData) => movieData.pages.flatMap((page) => page.results),
    }
  );
}
