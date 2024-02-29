import { useState } from "react"

const useSearchMovie = ( ) => {
  const API_URL = 'https://api.themoviedb.org/3/'
  const [movies, setMovies] = useState({
    movies: [],
    loading: false,
    error: null,
  })
  const [isMovie, setIsMovie] = useState(true)

  const [search, setSearch] = useState()

  const fecthMovie = async (search, isMovie ) => {
    console.log("Haciendo Fecth")
    setMovies({
      movies: [],
      loading: true,
      error: null,
    })
    try {
      const type = search ? 'search' : 'discover'
      const movieOrTv = isMovie ? 'movie' : 'tv'
      const response = await fetch(`${API_URL}${type}/${movieOrTv}?api_key=${import.meta.env.VITE_API_KEY}&query=${search}`)
      const data = await response.json()
      console.log(data)
      setMovies({
        movies: data.results,
        loading: false,
        error: null,
      })
    } catch (error) {
      setMovies({
        movies:[],
        loading:false,
        error:error,
      })      
    }
  }

  return {
    movies,
    isMovie,
    search,
    setSearch,
    setIsMovie,
    fecthMovie
  }
}

export default useSearchMovie