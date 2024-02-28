import { useEffect, useState } from "react"

const useSearchMovie = ( search = '' ) => {
  const API_URL = 'https://api.themoviedb.org/3/'

  const [movies, setMovies] = useState({
    movies: [],
    loading: false,
    error: null,
  })

  const getMovies = async () => {
    setMovies({
      movies: [],
      loading: true,
      error: null,
    })
    try {
      const data = null
      if(search !== ''){
        console.log("aca", search)
        const response = await fetch(`${API_URL}search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${search}`)  
        console.log(response)
        
      }else{
        console.log("aca no", search)
        const response = await fetch(`${API_URL}movie/popular?api_key=${import.meta.env.VITE_API_KEY}`)
        console.log(response)
      }
      data = await response.json()
      
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


  return {
    getMovies,
    movies
  }
}

export default useSearchMovie