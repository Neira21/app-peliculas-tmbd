import React from 'react'
import useForm from '../hooks/useForm'

import style from './Modal.module.css'

const Modal = ({movie, isMovie, handleModal}) => {

  const {calificacion, inputChange} = useForm({ calificacion: '' })

  const handleSubmit = (e) => {
    console.log(calificacion)
    e.preventDefault()
    agregarCalificacion()
    handleModal()
  }

  const agregarCalificacion = async () => {

    if(isMovie){
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${import.meta.env.VITE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: calificacion
        })
      })
      console.log(response)
    } else {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${movie.id}/rating?api_key=${import.meta.env.VITE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: calificacion
        })
      })
    console.log(response)
    }
  }




  return (
    <div className={style.modal}>
      <div className={style.modal_contenedor}>
        <div className={style.modal_header}>
          <h2 className={style.modal_title}>{movie.title}</h2>
        </div>

        <div className={style.modal_imagen}>
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />          
        </div>

        <p>Agregar Calificación (0 - 10)</p> 
        <div className={style.modal_body}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div>
              <input 
                name='calificacion'
                placeholder='Calificación...'
                onChange={inputChange} 
                value={calificacion} 
                type='text'
                />
            </div>
            <div>
              <button type='input'>Agregar</button>
            </div>
          </form>
        </div>
        <div className={style.modal_footer}>
          <button className={style.modal_btn} onClick={handleModal}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}

export default Modal