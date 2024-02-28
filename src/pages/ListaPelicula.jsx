import PeliculaContenedor from "../components/PeliculaContenedor"
import PeliculaFormulario from "../components/PeliculaFormulario"
import { useEffect, useState } from "react"

const ListaPelicula = () => {

  const API_URL = 'https://api.themoviedb.org/3/'

  const [movies, setMovies] = useState({
    movies: [],
    loading: false,
    error: null,
  })

  const [search, setSearch] = useState()

  const getMovies = async () => {
    setMovies({
      movies: [],
      loading: true,
      error: null,
    })

    try {
      if(search === undefined || search === ''){
        const response = await fetch(`${API_URL}movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
        const data = await response.json()
        console.log("asdsadasdasdasdsd")
        setMovies({
          movies: data.results,
          loading: false,
          error: null,
        })
        return
      }
      const response = await fetch(`${API_URL}search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${search}`)
      const data = await response.json()
      console.log(data)
      if(data.results.length === 0) throw new Error('No se encontraron resultados')
        setMovies({
          movies: data.results,
          loading: false,
          error: null,
        })
    } catch (error) {
      setMovies({
        movies: [],
        loading: false,
        error: error,
      })
    }
  }

  useEffect(()=>{
    getMovies()
  },[search])

  const handleSearch = (search) => {
    setSearch(search)
  }
  

  return (
    <div>
      <h1>Lista de Peliculas</h1>
      <PeliculaFormulario handleSearch={handleSearch} />
      
      {movies.error ? <p>{movies.error.message}</p> : <PeliculaContenedor movies = {movies}  />}
    </div>
  )
}

export default ListaPelicula