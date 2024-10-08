//import axios from 'axios'
//import { useEffect } from 'react'
import useTrending from '../hooks/useTrending'
import TrendingCards from '../components/TrendingCards'

const Inicio = () => {
  
  const { trending } = useTrending()

  return (
    <>
      <h1>Bienvenido a la página principal</h1>
      <p className='center' >
        Navegue en esta app para ver las películas o series más populares del momento.
      </p>
      <section>
        <h2>Películas y series de TV más populares</h2>
        <TrendingCards trending={trending} />
      </section>
    </>
  )
}

export default Inicio