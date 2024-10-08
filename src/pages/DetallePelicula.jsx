import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import PeliculaDetalle from '../components/PeliculaDetalle'
import { getMoviesOrSeries } from '../utils/queryMovies.js'

const DetallePelicula = () => {
  
  const location = useLocation();
  const tipo = new URLSearchParams(location.search).get('ismovie') === 'true' ? 'movie' : 'tv'
  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  
  const getMovie = async (id) => {
    setLoading(true)
    const data = await getMoviesOrSeries(`${tipo}/${id}`)
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
    <PeliculaDetalle data={data} loading={loading} tipo={tipo} />
    </>
  )
}

export default DetallePelicula