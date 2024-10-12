//import axios from 'axios'
//import { useEffect } from 'react'
import useTrending from "../hooks/useTrending";
import useCategories from "../hooks/useCategories";
import TrendingCards from "../components/TrendingCards";
//import { useEffect } from "react";
import CategoriaContenedor from "../components/CategoriaContenedor";

const Inicio = () => {
  const { trendingMovies, trendingTvs } = useTrending();
  const { categoriesMovies, categoriesTvs } = useCategories();

  return (
    <>
      <h1>Bienvenido a la página principal</h1>
      <p className="center">
        Navegue en esta app para ver las películas o series más populares del
        momento.
      </p>
      <section>
        <hr />
        <h1>Películas</h1>
        <CategoriaContenedor category={categoriesMovies} />
        <hr />
        <h1>Series de Televisión</h1>
        <CategoriaContenedor category={categoriesTvs} />
      </section>
      <section>
        <h2>Películas y series de TV más populares</h2>
        <TrendingCards trending={trendingMovies} />
        <TrendingCards trending={trendingTvs} />
      </section>


    </>
  );
};

export default Inicio;
