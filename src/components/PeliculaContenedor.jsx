import Pelicula from "./Pelicula"
import Loading from "./Loading";

const PeliculaContenedor = ({movies, isMovie}) => {
  return (
    <div className="movie-list">
      {
        movies.loading && <div className="center"><Loading type='spinningBubbles' color='blue' /></div>
      }
      {
        movies.movies.length === 0 && !movies.loading && <p>No hay peliculas</p>
      }
      {movies.movies.map(movie => (
          <Pelicula key={movie.id} movie={movie} isMovie={isMovie} />
        ))
      }
    </div>
  )
}

export default PeliculaContenedor