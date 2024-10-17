import useForm from '../hooks/useForm'
import style from './Modal.module.css'

//importar proptypes
import PropTypes from 'prop-types'



const Modal = ({detalle, isMovie, handleModal}) => {

  Modal.propTypes = {
    detalle: PropTypes.object.isRequired,
    isMovie: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired
  }

  const {calificacion, inputChange} = useForm({ calificacion: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    agregarCalificacion()
    handleModal()
  }

  const agregarCalificacion = async () => {

    if(isMovie){
      await fetch(`${import.meta.env.VITE_API_URL}movie/${detalle.id}/rating?api_key=${import.meta.env.VITE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: calificacion
        })
      })
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}tv/${detalle.id}/rating?api_key=${import.meta.env.VITE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODZlZTUyY2U2MGM5ZWJiMzgwNTEyN2RiNTNkN2Y2NyIsInN1YiI6IjYyYzBjYjE2NTMyYWNiMDMyOGQyNmY4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UbHOvXv3cT2bIHqz86uBHYGBj8VUyqB9PbCN477p9FM',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: calificacion
        })
      })
    }
  }




  return (
    <div className={style.modal}>
      <div className={style.modal_contenedor}>
        <div className={style.modal_header}>
          <h2 className={style.modal_title}>{detalle.title}</h2>
        </div>

        <div className={style.modal_imagen}>
          <img src={`${import.meta.env.VITE_IMAGE_URL}${detalle.poster_path}`} alt={detalle.title} />          
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