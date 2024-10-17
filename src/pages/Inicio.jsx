//import axios from 'axios'
//import { useEffect } from 'react'
import useTrending from "../hooks/useTrending";

import TrendingCards from "../components/TrendingCards";
import { useEffect, useState } from "react";
import { getMoviesOrSeries } from "../utils/queryMovies";

const Inicio = () => {
  const [moreValoration, setMoreValoration] = useState([]);
  const [isMovie, setIsMovie] = useState(true);

  
  const changeToMovie = () => {
    setIsMovie(true);
  };

  const changeToTv = () => {
    setIsMovie(false);
  };

  useEffect(() => {
    const fetchMoreValoration = async () => {
      try {
        if (isMovie) {
          const movies = await getMoviesOrSeries("/movie/top_rated");
          setMoreValoration(movies.results);
        } else {
          const series = await getMoviesOrSeries("/tv/top_rated");
          setMoreValoration(series.results);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMoreValoration();
  }, [isMovie]);

  const { trendingMovies, trendingTvs } = useTrending();
  return (
    <div style={{ paddingTop: "100px" }}>
      <h1>Bienvenido a la página principal</h1>
      <p className="center">
        Navegue en esta app para ver las películas o series más populares del
        momento.
      </p>
      <section>
        <h2>Películas y series de TV más populares</h2>
        <h3>Películas</h3>
        <TrendingCards trending={trendingMovies} />

        <h3>Series de TV</h3>
        <TrendingCards trending={trendingTvs} />
      </section>
      <section>
        {moreValoration && moreValoration.length > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>
                Las {isMovie ? "Películas" : "Series de TV"} mejor valoradas
              </h3>
              <div>
                <button
                  className={isMovie ? "seleccionado" : null}
                  onClick={changeToMovie}
                >
                  {" "}
                  Películas
                </button>
                <button
                  className={!isMovie ? "seleccionado" : null}
                  onClick={changeToTv}
                >
                  {" "}
                  Series
                </button>
              </div>
            </div>
            <TrendingCards trending={moreValoration} />
          </div>
        )}
      </section>
    </div>
  );
};

export default Inicio;
