import React from "react";
import Card from './Card'
import Sidebar from './Sidebar'

const Movie = ({fetchNextPage, handleChooseMovie, store}) => 
      <section>
       <div className='content'>
        <ul className='list' onScroll={fetchNextPage}>
            {store.films.map(item => (
               <Card key={item.id + Math.random().toString().slice(2)} {...item} chooseMovie={handleChooseMovie} />
           ))}
        </ul>        
        <div className='load_more' id='load_more'
            onClick={fetchNextPage}
            >Загрузить больше фильмов
        </div>
        </div>
             <Sidebar {...store} />
      </section>   

  export default Movie;

