import Pelicula from "./Pelicula"
import Loading from "./Loading";
import Proptypes from 'prop-types';

const PeliculaContenedor = ({movies, isMovie}) => {
  PeliculaContenedor.propTypes = {
    movies: Proptypes.shape({
      loading: Proptypes.bool.isRequired,
      movies: Proptypes.array.isRequired,
      error: Proptypes.object
    }).isRequired,
    isMovie: Proptypes.bool.isRequired
  }
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