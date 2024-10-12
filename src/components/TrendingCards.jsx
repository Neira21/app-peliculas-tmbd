import PropTypes from "prop-types";
import style from "./TrendingCards.module.css";
import Loading from "./Loading";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const TrendingCard = ({ trending }) => {
  TrendingCard.propTypes = {
    trending: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        original_title: PropTypes.string,
        name: PropTypes?.string,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        media_type: PropTypes.string.isRequired,
      })
    ),
  };



  //const isMovie = trending[0]?.media_type === "movie" ? true : false;

  const navigate = useNavigate();

  const handleTrend = () => {
    const isMovie = trending[0]?.media_type === "movie" ? "movietrend" : "tvtrend";
    navigate(`/peliculalista?ismovie=${isMovie}`, { replace: false });
  }

  return (
    <>
      {!trending || trending.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading type="spinningBubbles" color="blue" />
        </div>
      ) : (
        <div>
          <div className={style.header}>
            {trending[0]?.media_type === "movie" ? (
              <h1>Lo más popular en Películas</h1>
            ) : (
              <h1>Lo más popular en series de TV</h1>
            )}
            <button className={style.header_button} onClick={handleTrend} >Ver más</button>
          </div>

          <div className={style.container_trending}>
            {trending.map((item) => {
              const isMovie = item.media_type === "movie" ? true : false;
              return (
                <div key={item.id} className={style.container_trending_card}>
                  {/* ?ismovie=${isMovie} */}
                  <Link to={`/peliculadetalle/${item.id}?ismovie=${isMovie}`}
                  >
                  <img
                    className={style.trending_card_img}
                    src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                    alt={item.original_title || item.name}
                  />
                  </Link>

                  
                  <h3 className={style.trending_card_title}>
                    {item.original_title || item.name}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingCard;
