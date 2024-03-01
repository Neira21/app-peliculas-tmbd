import Loading from './Loading'

const PeliculaDetalle = ({data, loading, tipo}) => {
  
  return (
    <div>
      {loading 
      ? <div className="center"><Loading type='spinningBubbles' color='blue' /></div>
      : 
      <>
        <h1>Detalle de {tipo === 'movie' ? 'la Pelicula' : 'la Serie de TV'}</h1>
        <div className='movie-detail' >
          <h2>{tipo === 'movie' ? data.title : data.name}</h2>
            
          <img src={`https://image.tmdb.org/t/p/w200${data.poster_path}`} alt={data.title}/>
          <p className='center' >{data.overview}</p>
        </div>
      </>
      }
    </div>
  )
}

export default PeliculaDetalle