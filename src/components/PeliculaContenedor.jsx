import Pelicula from "./Pelicula"

const PeliculaContenedor = ({movies}) => {
  return (
    <div className="movie-list">
      {
        movies.loading && <p>Cargando...</p>
      }
      {movies.movies.map(movie => (
          <Pelicula key={movie.id} movie={movie} />
        ))
      }
    </div>
  )
}

export default PeliculaContenedor