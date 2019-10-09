import React, { useState, useEffect } from "react";
import './Main.css'
import Movie from './Movie'  
import {filterMovie, SortMovie, loadByScroll, fetchData} from '../lib/methods';
import {genres} from '../lib/constants';

export function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [release, setRelease] = useState('');
  const [vote, setVote] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({pages: 500, results: 10000});  
  const [enablFilters, toggleStatusFilters] = useState(false);
  const [textButton, setTextButton] = useState('Применить фильтры');
  const [mystore, setMyStore] = useState({
    backdrop_path: '',
    title: '',
    overview: '',
    release_date: '',
    vote_average: '',
    enablFilters: '',
    genre_ids: [],
    films: []
  })

  const writeResult = data => {
    setMyStore({
      ...mystore,
      films: SortMovie([...mystore.films, ...data.results]) 
    })
    setTotal({ 
      pages: data.total_pages,
      results: data.total_results
    })
  }

  const fetchNextPage = () => {
    if(total.results > mystore.films.length && !enablFilters) {
      setPage(page + 1)
      fetchData(searchQuery, page, writeResult)        
   }
}  
  const getMovieByTitles = (e) => {
    toggleStatusFilters(false);
    setSearchQuery(e.target.value);
    if(mystore.films.length > 0) {
      let films = [];
      setMyStore({
        ...mystore,
        films
        })
      }
    }

  const handleCheckbox = (value) => {
  mystore.genre_ids.length > 0 ? mystore.genre_ids.includes(value) ? 
   setMyStore({
    ...mystore,
    genre_ids: mystore.genre_ids.filter(v => v !== value)
   }) :
   setMyStore({
    ...mystore,
    genre_ids: [...mystore.genre_ids, value] 
   }) : 
   setMyStore({
    ...mystore,
    genre_ids: [value] 
   })
 } 

  useEffect(() => {  
    fetchData(searchQuery, page, writeResult);
      window.addEventListener('scroll', loadByScroll)
        setMyStore({
          ...mystore,
          fetchNextPage,
          handleChooseMovie
        })
      }, [searchQuery, release, vote, page]);

  const applyFiltr = (e) => {
    e.preventDefault();
    toggleStatusFilters(true);
      if(vote && release && mystore.genre_ids.length > 0) {
        setTextButton('Применить фильтры')        
        let films = filterMovie(mystore, release, vote);
          setMyStore({
            ...mystore,
                films
          })  
        } else {
         setTextButton('Заполните поля')
      }
  }

  const handleChooseMovie = (id) => {
    const movie = mystore.films.filter(mov => mov.id === id)[0]
    setMyStore({
      ...mystore,
      backdrop_path: movie.backdrop_path,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      vote_average: movie.vote_average,  
      genre_ids: movie.genre_ids
    })
  }
  return(
    mystore.films ?      
    <div className='main'>
    <form>
     <div className='query'> 
      <label htmlFor="searchQuery">Название</label>
        <input value={searchQuery} id='searchQuery' placeholder='abcetc'
         pattern="[A-Za-z]{4,}" onChange={e => getMovieByTitles(e)} />
      <label htmlFor="release">Год</label>
        <input value={release} id='release' placeholder='nnnn'
         pattern="[0-9]{4}" onChange={e => setRelease(e.target.value)} /> 
      <label htmlFor="vote">Рейтинг</label>
       <input value={vote} id='vote' placeholder='n'
        pattern="[0-9]{1}" onChange={e => setVote(e.target.value)} /> 
    </div> 
        <div className='genres'>
          {genres.map(genre => 
            <div key={genre.id}>
            <label htmlFor={genre.id}>{genre.name}</label><input type='checkbox' className='ganresIn'
                  value={genre.id} id={genre.id} onChange={e => handleCheckbox(e.target.value)} />
            </div> 
            )}
        </div>
      <br/>
      <button onClick={e => applyFiltr(e)}>{textButton}</button>      
      </form>
        <Movie 
          fetchNextPage={fetchNextPage}
          handleChooseMovie={handleChooseMovie}
          store={mystore}
        />
      </div>
      : <p>Загрузка</p>
  )
}

export default Main
