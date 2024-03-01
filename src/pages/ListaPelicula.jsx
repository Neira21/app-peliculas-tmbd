import PeliculaContenedor from "../components/PeliculaContenedor"
import PeliculaFormulario from "../components/PeliculaFormulario"
import { useEffect } from "react"
import useSearchMovie from "../hooks/useSearchMovie"

const ListaPelicula = () => {

  const { movies, isMovie, search, setSearch, setIsMovie, fecthMovie } = useSearchMovie()

  useEffect(()=>{
    fecthMovie(search, isMovie)
    console.log("isMovie es ", isMovie)
  },[isMovie, search])

  const ChangeToPelicula = () => {
    setIsMovie(true)
  }

  const ChangeToSerie = () => {
    setIsMovie(false)
  }

  return (
    <div>
      <h1>Lista de {isMovie ? 'Peliculas' : 'Series de TV' } </h1>
      <div className="center">
        <button
          style={{backgroundColor: isMovie ? 'blue' : 'red'}}
          onClick={ChangeToPelicula}>Peliculas</button>
        <button 
          style={{backgroundColor: isMovie ? 'red' : 'blue'}}
          onClick={ChangeToSerie}>Series
        </button>
      </div>
      <PeliculaFormulario setSearch={setSearch} />
      {movies.error ? <p>{movies.error.message}</p> : <PeliculaContenedor isMovie={isMovie}  movies = {movies}  />}
    </div>
  )
}

export default ListaPelicula