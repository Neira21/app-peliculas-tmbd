const Pelicula = ({movie}) => {

  // const movieText = movie.overview.length > 100 ? `${movie.overview.substring(0, 50)}...` : movie.overview

  let movieText = ''
  let contadorPalabras = 10

  if(movie.overview.length > 50) {
    let palabras = movie.overview.split(' ')
    let arrayPalabras = palabras.slice(0, contadorPalabras)
    movieText = arrayPalabras.join(' ') + '...'
  }
  else {
    movieText = movie.overview
  }

  return (
    <div className="movie-card" key={movie.id}>
      {movie.title === undefined ? <h2>{movie.name}</h2> : <h2>{movie.title}</h2>}
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
      <p>{movieText}</p>
    </div>
  )
}

export default Pelicula