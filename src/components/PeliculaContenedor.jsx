import Pelicula from "./Pelicula"
import Loading from "./Loading";

const PeliculaContenedor = ({movies}) => {

  // const poster = (movie) => {
  //   if (movie.poster_path) {
  //     return `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  //   } else {
  //     return noImage
  //   }
  // }

  return (
    <div className="movie-list">
      {
        movies.loading && <div className="center"><Loading type='spinningBubbles' color='blue' /></div>
      }
      {
        movies.movies.length === 0 && !movies.loading && <p>No hay peliculas</p>
      }
      
      {movies.movies.map(movie => (
          <Pelicula key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default PeliculaContenedor