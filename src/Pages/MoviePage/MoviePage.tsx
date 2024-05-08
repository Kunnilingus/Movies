import { FC } from "react";
import styles from "./moviePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMoviesQuery } from "../../store/moviesApi";
import Header from "../../components/Header/Header";
import Player from "../../components/Player/Player";

const MoviePage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data = [] } = useGetMoviesQuery(40);
  const currentMovie = data.find((item) => item.title.trim() === params.title);
  return (
    <>
      <Header data={data} />
      <button className={styles.goBack} onClick={() => navigate(-1)}>
        {"< Назад"}
      </button>
      <main className={styles.movieContainer}>
        <section className={styles.movieInfo}>
          <div className={styles.movieOptions}>
            <img src={currentMovie?.img} alt="img" />
            <div>
              <p>Отложить просмотр</p>
              <p>Добавить в избранное</p>
            </div>
          </div>
          <div className={styles.movieDesc}>
            <p>{currentMovie?.title}</p>
            <p>Дата выхода: {currentMovie?.date}</p>
            <p>Рейтинг Kinopoisk: {currentMovie?.rating}</p>
            <p>Жанр: {currentMovie?.janres}</p>
            <p>{currentMovie?.desc}</p>
          </div>
        </section>
        <section className={styles.player}>
          <Player poster={currentMovie?.poster} />
        </section>
      </main>
    </>
  );
};

export default MoviePage;
