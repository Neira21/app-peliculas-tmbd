import { useNavigate } from 'react-router-dom'
import { useParams} from 'react-router-dom'
import { useEffect, useState } from 'react'

import PeliculaDetalle from '../components/PeliculaDetalle'

const DetallePelicula = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState([{}])
  const [loading, setLoading] = useState(false)
  
  const getMovie = async (id) => {
    setLoading(true)
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`)
    const data = await response.json()
    setData(data)
    setLoading(false)
  }

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
    <PeliculaDetalle data={data} loading={loading} />
    </>
  )
}

export default DetallePelicula