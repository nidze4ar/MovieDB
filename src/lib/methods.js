import axios from 'axios';
import {searchApi, eng, adult} from '../lib/constants'

function Intersect(left, right) {                                                     // пересечение массивов
  return left.filter(function(el){
      return right.indexOf(el) !== -1;
  });
}

export function SortMovie(arr) {                                                      // сортировка по дате
  if(arr.length > 0 && arr.every(v => v.release_date) )
  return arr.sort((a, b) => b.release_date.slice(0, 4) - a.release_date.slice(0, 4))
  return arr;
}

export function filterMovie(store, date, number) {                                    // расширенный выбор
  return store.films.filter(v => +v.release_date.slice(0, 4) === +date)
  .filter(v => Intersect(v.genre_ids, store.genre_ids) ) 
  .filter(v => v.vote_average > +number || v.vote_average === +number)
}

export function loadByScroll() {                                                      // автопагинация
 let elem = document.getElementById('load_more');
 var event = new Event("click", {bubbles : true, cancelable : true})
 let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
   if (windowRelativeBottom < document.documentElement.clientHeight + 100){
//       window.scrollTo(300, 2400);
       elem.dispatchEvent(event)  
      }
}

export function validate(str, type) {
  return type === 'number' ? /\D/.test(str) : /\W/.test(str)
}

export function fingGenres(storage, mask) {                                            // вывод жанров 
  return storage.map(genre => mask.filter(entry => entry.id === genre)[0].name )
}

export function testItemInArray(storage, mask) {                                       // валидация хранилица жанров
  return storage.length > 0 && storage.every(v => mask.includes(v) )
}

export const fetchData = async function(query, page, writeResult) {                    // запрос по названию
  if(query.length) {
    let api = searchApi + eng + query + `&page=${page.toString()}` + adult;
    let ignore = false;       
    let result = await axios(api);
    if (!ignore) {
      writeResult(result.data)     
    }
    return () => { ignore = true; } 
  }  
}

export function formateDate(str){
  return new Date(str.slice(0, 4), str.slice(4, 6), str.slice(-2)).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}


 


