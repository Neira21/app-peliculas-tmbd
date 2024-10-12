import { useState } from "react";
import { getMoviesOrSeries } from "../utils/queryMovies";
// hook para buscar películas o series de TV
// Si no se pasa un valor de búsqueda, se obtienen todas las películas o series de TV mediante DISCOVER

const useSearchMovie = (trendmovie, genre) => {
  const [movies, setMovies] = useState({
    movies: [],
    loading: true,
    error: null,
  });
  const [isMovie, setIsMovie] = useState(
    trendmovie === undefined ? true : trendmovie === true ? true : false
  );

  const [search, setSearch] = useState();
  const [page, setPage] = useState(1); // Agregar el estado de paginación
  const [hasMore, setHasMore] = useState(true); // Agregar el estado para saber si hay más resultados

  const fecthMovie = async (search, isMovie, page = 1) => {
    if (page === 1) {
      setMovies({
        movies: [],
        loading: true,
        error: null,
      });
    } else {
      setMovies((prevMovies) => ({
        ...prevMovies,
        loading: true,
      }));
    }

    try {
      const type = search ? "search" : "discover";
      const movieOrTv = isMovie ? "movie" : "tv";

      let data;

      if (trendmovie !== undefined && (!search || search.length === 0)) {
        // Si trendmovie es true o false, realiza la búsqueda de tendencias
        data = isMovie
          ? await getMoviesOrSeries(`trending/movie/day?page=${page}`)
          : await getMoviesOrSeries(`trending/tv/day?page=${page}`);
      } else if (genre && (!search || search.length === 0)) {
        data = await getMoviesOrSeries(
          `${type}/${movieOrTv}?with_genres=${genre}&page=${page}`
        );
      } else {
        data =
          search && search.length > 0
            ? await getMoviesOrSeries(
                `${type}/${movieOrTv}?query=${search}&page=${page}`
              )
            : await getMoviesOrSeries(`${type}/${movieOrTv}?page=${page}`);
      }

      setMovies((prevMovies) => ({
        movies:
          page === 1 ? data.results : [...prevMovies.movies, ...data.results],
        loading: false,
        error: null,
      }));

      if (data.results.length === 0) {
        setHasMore(false); // Si ya no hay más resultados
      }
    } catch (error) {
      setMovies({
        movies: [],
        loading: false,
        error: error,
      });
      setHasMore(false);
    }
  };

  return {
    movies,
    isMovie,
    search,
    setSearch,
    setIsMovie,
    fecthMovie,
    hasMore, // Retornar el estado de hasMore
    page,
    setPage, // Retornar también el estado de página
  };
};

export default useSearchMovie;
