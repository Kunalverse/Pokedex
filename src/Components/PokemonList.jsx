import React from 'react'
import {useEffect, useState } from 'react'
import axios from 'axios'
import Pokemon from './Pokemon';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Link} from 'react-router-dom';

function PokemonList() {
    const [pokeList,setPokeList] = useState([]);
  const [offset,setOffset] = useState(20);

  useEffect(()=>{
    const getPokemonList =async()=>{
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon');

        setPokeList(res.data.results);
        
      } catch (error) {
        console.log(error)
      }
    }
    getPokemonList();
  },[])

   const fetchMoreData =async()=>{
    try {
      console.log('called');
      setOffset(prev => prev + 20);
      if(offset < 1000){
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
      setPokeList(pokeList.concat( res.data.results));
      }
      else if(offset === 1000){
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
        setPokeList(pokeList.concat( res.data.results));
      }
      
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div className='container ms-0'>
      <h1 className="fw-bolder">Pok&#233;dex</h1>
      <InfiniteScroll dataLength={pokeList.length}
        next={ fetchMoreData }
        hasMore={pokeList.length < 1010}
        loader={<h4>Loading...</h4>}>
          <div className="d-flex flex-row flex-wrap mx-4">
            {pokeList.map((poke,index)=> (<Link to={ `/pokemon/${index}`}><Pokemon key={poke.url} name={poke.name} index={index}/> </Link>))}
          </div>
      </InfiniteScroll>
      

    </div>
  )
}

export default PokemonList