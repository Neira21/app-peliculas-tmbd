import Loading from './Loading'

const PeliculaDetalle = ({data, loading}) => {
  return (
    <div>
      {loading 
      ? <div className="center"><Loading type='spinningBubbles' color='blue' /></div>
      : 
      <>
      <h1>Detalle de Pelicula</h1>
        <div className='movie-detail' >
          <h2>{data.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w200${data.poster_path}`} alt={data.title}/>
          <p className='center' >{data.overview}</p>
        </div>
      </>
      }
    </div>
  )
}

export default PeliculaDetalle