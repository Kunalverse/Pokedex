import React, {useState,useEffect}from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

function PokemonDetails() {

    const {id} = useParams();
    const ID = Number(id);

    const [url,setUrl] = useState('');
    const [pokeIndex,setPokeIndex] = useState('001');
    const [details,setDetails]= useState({});

    useEffect(()=>{
    
        const getDetails =async()=>{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ID + 1}`);
            console.log(ID);
            setDetails(res.data);
            console.log(res.data);
        }
        
        getDetails();
        
      },[ID])

    useEffect(()=>{
      const getUrl =()=>{
        try{ 
          let idx = ID + 1;
          if(ID + 1 <10){
            const pIdx = "00"+idx.toString();
            setPokeIndex(pIdx);
          }
          else if(ID + 1 <100){
            const pIdx = "0"+idx.toString();
            setPokeIndex(pIdx);
          }
          else{
            setPokeIndex(idx);
          }
            
          setUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`);
          console.log(`called url for ${pokeIndex}`)
            
          } catch (error) {
          console.log(error);
        }
           
      } 
      getUrl();
    },[pokeIndex])
      


    const capitalizeName =(content) =>{
      if (details && content) {
        const capName = content.charAt(0).toUpperCase() + content.slice(1);
        return capName;
      }
      return '';
      }
    
  return (
    <div className="fullscreen-container" >
      <div className='container w-75 bg-light px-3 pb-3 rounded'>
    
        <div className='d-flex flex-row mt-5 justify-content-center'>
        <div className='mt-4'><p className='h1'>{capitalizeName(details.name)} </p></div>
        <div className='mt-4'><p className='h1 text-secondary'>&nbsp;#{pokeIndex}</p></div>
        </div>
        <div className="d-flex flex-row my-5 justify-content-around">
        <div className='w-25 align-self-start'>
            <img src={url} alt="" className='rounded mx-auto d-block' style={{width:'20rem',backgroundColor:"#C8CFCF"}}/>
        </div>
        <div className='row row-cols-2 bg-primary rounded w-50'>
          <div className='col text-start p-3'><h6 className='text-light'>Height </h6>
          <h5> {(details.height * 0.1).toFixed(2)} m</h5>
          </div>
          <div className='col text-start p-3'><h6 className='text-light'>Weight </h6>
          <h5> {(details.weight * 0.1).toFixed(2)} kg</h5>
          </div>
          <div className='col text-start p-3'>
            <h6 className='text-light'>Base Experience</h6>
            <h5>{details.base_experience ? details.base_experience:'N/A'}</h5>
          </div>
          <div className='col text-start p-3'><h6 className='text-light'>Abilities</h6>
          {details.abilities
    ? details.abilities.map(abilityList => (
        <h5 key={abilityList.ability.name}>{capitalizeName(abilityList.ability.name)}</h5>
      ))
    : 'No abilities found'}
          </div>
        </div>
        </div>
    </div>
    </div>
    
  )
}

export default PokemonDetails