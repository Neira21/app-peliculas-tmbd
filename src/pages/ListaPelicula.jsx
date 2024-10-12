import { useEffect, useCallback } from "react";
import debounce from 'just-debounce-it';
import InfiniteScroll from 'react-infinite-scroll-component';
import PeliculaContenedor from "../components/PeliculaContenedor";
import PeliculaFormulario from "../components/PeliculaFormulario";
import useSearchMovie from "../hooks/useSearchMovie";
import { useLocation } from "react-router-dom";

const ListaPelicula = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const isMovieParam = params.get('ismovie');
  const genre = params.get('genre');
  const trendmovie = isMovieParam === "movietrend" ? true
                  : isMovieParam === "tvtrend" ? false
                  : undefined;
  
  const { movies, isMovie, search, setSearch, setIsMovie, fecthMovie, hasMore, page, setPage } = useSearchMovie(trendmovie, genre);

  // Crear la función debounced usando useCallback para memorizarla.
  const debouncedSearch = useCallback(
    debounce(() => {
      fecthMovie(search, isMovie, 1);
      
    }, 400), // Espera 400 ms antes de hacer la búsqueda
    [search, isMovie] // Solo se recrea si search o isMovie cambian
  );

  useEffect(() => {
    debouncedSearch();
    // Cleanup: cancelar cualquier búsqueda pendiente si el componente se desmonta
    return () => {
      debouncedSearch.cancel();  // Cancela la búsqueda si se sigue tipeando
    };
  }, [debouncedSearch, search]);

  const ChangeToPelicula = () => {
    setIsMovie(true);
    setPage(1); // Reiniciar la página
  };

  const ChangeToSerie = () => {
    setIsMovie(false);
    setPage(1); // Reiniciar la página
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // Incrementar la página
    fecthMovie(search, isMovie, page + 1); // Cargar más películas o series
  };

  return (
    <div>
      <h1>Lista de {isMovie ? 'Peliculas' : 'Series de TV'}</h1>
      {/* {
        trendmovie === undefined ? <div className="center">
        
      </div> : null
      } */}
      <div className="center">
        <button
          style={{ backgroundColor: isMovie ? 'blue' : 'red' }}
          onClick={ChangeToPelicula}>Peliculas</button>
        <button
          style={{ backgroundColor: isMovie ? 'red' : 'blue' }}
          onClick={ChangeToSerie}>Series</button>
      </div>
      <PeliculaFormulario setSearch={setSearch} />
      {/* {movies.error ? <p>{movies.error.message}</p> : <PeliculaContenedor isMovie={isMovie} movies={movies} />} */}
      {/* Componente de InfiniteScroll */}
      <InfiniteScroll
        dataLength={movies.movies.length} // Largo de las películas cargadas hasta ahora
        next={loadMoreMovies} // Función para cargar más
        hasMore={hasMore} // Si hay más películas por cargar
        loader={<h4>Loading...</h4>} // Mensaje de carga
        endMessage={<p>No hay más películas o series</p>} // Fin de las películas
      >
        <PeliculaContenedor isMovie={isMovie} movies={movies} />
      </InfiniteScroll>
    </div>
  );
};

export default ListaPelicula;
