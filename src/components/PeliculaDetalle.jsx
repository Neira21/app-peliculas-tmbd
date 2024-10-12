import { useEffect } from 'react'
import Loading from "./Loading";
import PropTypes from "prop-types";
import style from "./PeliculaDetalle.module.css";
import YouTube from "react-youtube";

const PeliculaDetalle = ({ data, loading, tipo, trailer }) => {
  useEffect(()=>{
    console.log('PeliculaDetalle se ha montado', data)
  },[data])

  PeliculaDetalle.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    tipo: PropTypes.string,
    trailer: PropTypes.string,
  };

  return (
    <div>
      {loading ? (
        <div className="center">
          <Loading type="spinningBubbles" color="blue" />
        </div>
      ) : (
        <>
          <div className={style.movie_detail}>
            <h2>{tipo === "movie" ? data.title : data.name}</h2>

            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${data.backdrop_path}`}
              alt={data.title}
            />
            <p className="center">{data.overview}</p>
            <YouTube
              videoId={trailer}
              
              opts={{
                height: "390",
                width: "640",
                playerVars: {
                  autoplay: 1,
                },
              }}
              
            />
            

            <h2>Géneros</h2>
            <ul className={style.movie_detail_genres}>
              {data.genres?.map((genre) => (
                <li className={style.movie_detail_genres_item} key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default PeliculaDetalle;
