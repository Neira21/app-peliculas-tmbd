import { Link } from "react-router-dom"
import noImage from '../assets/noimagen.png'
import { useState } from "react"
import Modal from "./Modal"
import PropTypes from 'prop-types'

const Pelicula = ({movie, isMovie}) => {
  Pelicula.propTypes = {
    movie: PropTypes.object.isRequired,
    isMovie: PropTypes.bool.isRequired
  }

  const [modal, setModal] = useState(false)

  const handleModal = () => {  
    setModal(!modal)
  }

  let movieText = ''
  let contadorPalabras = 10
  const moviePoster = movie.poster_path ? `${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}` : noImage

  if(movie.overview.length > 15) {
    let palabras = movie.overview.split(' ')
    let arrayPalabras = palabras.slice(0, contadorPalabras)
    movieText = arrayPalabras.join(' ') + '...'
  } else {
    if(movie.overview.length === 0) movieText = 'Sin descripción'
    else movieText = movie.overview
  }
  return (
    <div className="movie-card" key={movie.id}>
      {movie.title === undefined ? <h2>{movie.name}</h2> : <h2>{movie.title}</h2>}
      <Link to={`/peliculadetalle/${movie.id}?ismovie=${isMovie}`}>
        <img src={moviePoster} alt={movie.title} />
      </Link>
      <p>{movieText}</p>
      <button onClick={handleModal}>Agregar Calificación</button>
      {modal 
        ? <Modal movie={movie} isMovie={isMovie} handleModal={handleModal}/>
        : null 
      }
    </div>
  )
}

export default Pelicula