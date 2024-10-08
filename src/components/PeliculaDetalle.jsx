import Loading from './Loading'
import PropTypes from 'prop-types'


const PeliculaDetalle = ({data, loading, tipo}) => {

  PeliculaDetalle.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    tipo: PropTypes.string
  }
  
  return (
    <div>
      {loading 
      ? <div className="center"><Loading type='spinningBubbles' color='blue' /></div>
      : 
      <>
        <h1>Detalle de {tipo === 'movie' ? 'la Pelicula' : 'la Serie de TV'}</h1>
        <div className='movie-detail' >
          <h2>{tipo === 'movie' ? data.title : data.name}</h2>
            
          <img src={`${import.meta.env.VITE_IMAGE_URL}${data.poster_path}`} alt={data.title}/>
          <p className='center' >{data.overview}</p>
        </div>
      </>
      }
    </div>
  )
}

export default PeliculaDetalle