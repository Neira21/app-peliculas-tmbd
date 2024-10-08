import { useEffect, useCallback } from "react";
import debounce from 'just-debounce-it';
import PeliculaContenedor from "../components/PeliculaContenedor";
import PeliculaFormulario from "../components/PeliculaFormulario";
import useSearchMovie from "../hooks/useSearchMovie";

const ListaPelicula = () => {
  const { movies, isMovie, search, setSearch, setIsMovie, fecthMovie } = useSearchMovie();

  // Crear la función debounced usando useCallback para memorizarla.
  const debouncedSearch = useCallback(
    debounce(() => {
      fecthMovie(search, isMovie);
      
    }, 400), // Espera 0.4 segundos antes de hacer la búsqueda
    [search, isMovie] // Solo se recrea si search o isMovie cambian
  );

  useEffect(() => {
    // Ejecuta la búsqueda solo cuando el valor de search cambie.
    debouncedSearch();

    // Cleanup: cancelar cualquier búsqueda pendiente si el componente se desmonta
    return () => {
      debouncedSearch.cancel();  // Cancela la búsqueda si se sigue tipeando
    };
  }, [debouncedSearch, search]);

  const ChangeToPelicula = () => {
    setIsMovie(true);
  };

  const ChangeToSerie = () => {
    setIsMovie(false);
  };

  return (
    <div>
      <h1>Lista de {isMovie ? 'Peliculas' : 'Series de TV'}</h1>
      <div className="center">
        <button
          style={{ backgroundColor: isMovie ? 'blue' : 'red' }}
          onClick={ChangeToPelicula}>Peliculas</button>
        <button
          style={{ backgroundColor: isMovie ? 'red' : 'blue' }}
          onClick={ChangeToSerie}>Series</button>
      </div>
      <PeliculaFormulario setSearch={setSearch} />
      {movies.error ? <p>{movies.error.message}</p> : <PeliculaContenedor isMovie={isMovie} movies={movies} />}
    </div>
  );
};

export default ListaPelicula;
