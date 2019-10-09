import React from "react";

const Card = ({title, vote_average, overview, release_date, chooseMovie, id}) => {
  return(
  <div className='movie' onClick={() => chooseMovie(id)}>
    <p>{title ? title: ''}  ID: {id}</p>
    <p>Дата релиза: {release_date ? release_date: ''} Рейтинг: {vote_average ? vote_average : 'Hz'}</p>
    <p>{overview? overview.length > 100 ? overview.slice(0, 99) + ' ...' : overview : ''}</p>
  </div>
  )
}

export default Card