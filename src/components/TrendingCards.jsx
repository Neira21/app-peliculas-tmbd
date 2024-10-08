import PropTypes from "prop-types";

import style from "./TrendingCards.module.css";

const TrendingCard = ({ trending }) => {
  TrendingCard.propTypes = {
    trending: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        original_title: PropTypes.string,
        name: PropTypes?.string,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
      })).isRequired,
  };


  return (
    <div className={style.container_trending}>
      {trending.map((item) => (
        <div key={item.id} className={style.container_trending_card}>
          <img
            className={style.trending_card_img}
            src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
            alt={item.original_title || item.name}
          />
          <h3 className={style.trending_card_title}>{item.original_title || item.name} </h3>
        </div>
      ))}
    </div>
  );
};

export default TrendingCard;
