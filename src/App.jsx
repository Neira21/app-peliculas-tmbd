import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import ListaPelicula from './pages/ListaPelicula'
import DetallePelicula from './pages/DetallePelicula'
import Error from './pages/Error'
import Header from './components/Header'
import ListaPeliculasValoradas from './pages/ListaPeliculasValoradas'

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/peliculalista' element={<ListaPelicula/>} />
        <Route path='/peliculadetalle/:id' element={<DetallePelicula/>} />
        <Route path='/peliculasvaloradas' element={<ListaPeliculasValoradas/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App