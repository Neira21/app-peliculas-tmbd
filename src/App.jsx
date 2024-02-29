import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import ListaPelicula from './pages/ListaPelicula'
import DetallePelicula from './pages/DetallePelicula'
import Error from './pages/Error'
import Header from './components/Header'

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Inicio/>} />
        <Route path='/peliculalista' element={<ListaPelicula/>} />
        <Route path='/peliculadetalle/:id' element={<DetallePelicula/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  )
}

export default App