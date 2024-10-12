import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PeliculaDetalle from '../components/PeliculaDetalle'
//import { getMoviesOrSeries } from '../utils/queryMovies.js'
import axios from 'axios'


const DetallePelicula = () => {
  
  const location = useLocation();
  const tipo = new URLSearchParams(location.search).get('ismovie') === 'true' ? 'movie' : 'tv'
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false) 
  const [trailer, setTrailer] = useState('')
  const [similar, setSimilar] = useState([])
  
  const getMovie = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${tipo}/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: 'videos'
        }
      })
      const data = response.data
      setData(data)
      setLoading(false)
      if(data && data.videos && data.videos.results.length > 0){

        const response2 = await axios.get(`${import.meta.env.VITE_API_URL}${tipo}/${id}/similar`,{
          params: {
            api_key: import.meta.env.VITE_API_KEY
          }
        })
        const data2 = await response2.data.results
        const validResult = await data2.filter((movie) => movie.poster_path !== null).slice(0, 4)
        setSimilar(validResult)
        const key = data.videos.results.find(video => video.type= 'Trailer').key
        setTrailer(key)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Cada vez que el ID en la URL cambie, ejecuta la función para buscar los detalles de la nueva película
    getMovie(id);
  }, [id]); // El useEffect se vuelve a ejecutar cuando el ID cambia

  const regresarAnterior = () => {
    navigate(-1)
  }

  
  return (
    <>
    <button onClick={regresarAnterior} >
      Regresar
    </button>
    <PeliculaDetalle data={data} loading={loading} tipo={tipo} trailer={trailer} similar={similar} />
    </>
  )
}

export default DetallePelicula