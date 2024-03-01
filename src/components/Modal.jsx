import React from 'react'
import useForm from '../hooks/useForm'

import style from './Modal.module.css'

const Modal = ({handleModal}) => {

  const {calificacion, inputChange} = useForm({ calificacion: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={style.modal}>
      <div className={style.modal_contenedor}>
        <div className={style.modal_header}>
          <h2 className={style.modal_title}>Titulo</h2>
        </div>

        <div className={style.modal_imagen}>
          {/* imagen random */}
          <img src='https://via.placeholder.com/150' alt='imagen'/>
        </div>

        <p>Agregar Calificación (0 - 10)</p> 
        <div className={style.modal_body}>
          <form className={style.form} onSubmit={handleSubmit}>
            <div>
              <input 
                className='forminput'
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