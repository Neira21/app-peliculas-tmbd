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

  
  const getMovie = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`https://api.themoviedb.org/3/${tipo}/${id}`, {
        params: {
          api_key: import.meta.env.VITE_API_KEY,
          append_to_response: 'videos'
        }
      })
      const data = response.data
      setData(data)
      setLoading(false)
      if(data && data.videos && data.videos.results.length > 0){
        const key = data.videos.results.find(video => video.type= 'Trailer').key
        setTrailer(key)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log('video', trailer)
  },[trailer])

  const regresarAnterior = () => {
    navigate(-1)
  }

  useEffect(() => {
    getMovie(id)
  }, [])
  
  return (
    <>
    <button onClick={regresarAnterior} >
      Regresar
    </button>
    <PeliculaDetalle data={data} loading={loading} tipo={tipo} trailer={trailer} />
    </>
  )
}

export default DetallePelicula