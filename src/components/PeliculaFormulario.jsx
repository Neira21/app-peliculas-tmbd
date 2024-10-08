import useForm from '../hooks/useForm'
import { BiSolidSearch } from "react-icons/bi";
import PropTypes from 'prop-types'
import { useEffect } from 'react';


const PeliculaFormulario = ({setSearch}) => {
  PeliculaFormulario.propTypes = {
    setSearch: PropTypes.func.isRequired
  }
  
  const initialState = {
    search: ''
  }

  const {search, formState, inputChange } = useForm(initialState)

  
  useEffect(()=>{
    setSearch(formState.search)
  },[formState])

  return (
    <form >
      <input 
        type="text" 
        name='search'
        placeholder='Ingrese una pelicula...'
        value={search}
        onChange={inputChange}
      />
      <button>
        <BiSolidSearch size={20} color='purple' />
      </button>
    </form>
  )
}

export default PeliculaFormulario