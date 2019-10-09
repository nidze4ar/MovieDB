import React from "react";
import {genres, ids} from '../lib/constants';
import {fingGenres, testItemInArray, formateDate} from '../lib/methods';

  const Sidebar = ({backdrop_path, title, overview, release_date, vote_average, genre_ids}) => {
    const literalyGenres = testItemInArray(genre_ids, ids) ? fingGenres(genre_ids, genres) : ['жанр не отмечен']
    return title ? (
    <article className='card'>
          <img src={`https://image.tmdb.org/t/p/w185${backdrop_path}`} alt='постер не найден' />
          <p>{title ? title: 'безимянный'}</p>
          <p>{overview? overview: 'нет описаний'}</p>
          <p>Дата релиза: {release_date ? formateDate(release_date) : 'неизвестно'}</p>
          <p>Рейтинг: {vote_average ? vote_average : 'неизвестно'}</p>
          <ul>{literalyGenres.map(v => <li key={Math.random().toString().slice(2)} type="square">{v}</li>)}</ul>       
    </article>
    ) : null
  }

  export default Sidebar