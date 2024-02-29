import useForm from '../hooks/useForm'
import { BiSolidSearch } from "react-icons/bi";


const PeliculaFormulario = ({setSearch}) => {
  
  const initialState = {
    search: ''
  }

  const {search, formState, inputChange } = useForm(initialState)

  const onSubmit = (e) => {
    e.preventDefault()
    setSearch(search)
  }

  return (
    <form onSubmit={onSubmit} >
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