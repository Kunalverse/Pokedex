import React, { useEffect, useState } from 'react'
import axios from 'axios'
import colorType from '../type-color.json';

function Pokemon(props) {
  const [url,setUrl] = useState('');
  const [pokeIndex,setPokeIndex] = useState('001')
  const [types,setTypes] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(()=>{
    
    const getTypes =async()=>{
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
        setTypes(res.data.types);
        // console.log(res.data.types);
    }

    getTypes();
    
  },[props.name])

  useEffect(()=>{
    const getUrl =()=>{
      try { 
        let idx = props.index + 1;
        if(props.index + 1 <10){
          const pIdx = "00"+idx.toString();
          setPokeIndex(pIdx);
        }
        else if(props.index + 1 <100){
          const pIdx = "0"+idx.toString();
          setPokeIndex(pIdx);
        }
        else{
          setPokeIndex(idx);
        }
        
        setUrl(`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokeIndex}.png`)
        
       } catch (error) {
        console.log(error);
       }
       
    } 

    getUrl();

  },[pokeIndex])

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => {
      setIsHovered(false);
    }, 100); 
  };

  const capitalizeName =(name) =>{
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    return capName;
  }
  return (
    <div className={`card mx-2 my-2 cardMove ${isHovered ? 'hovered' : ''}`} onMouseEnter={handleMouseEnter}>
        <img src={url} className="card-img-top my-2" style={{backgroundColor:'#D8E3E3'}}alt="..."/>
        <h5 className="card-title">{capitalizeName(props.name)}</h5>
        <span className='my-1'>#{pokeIndex}</span>
        <div className='d-flex flex-row justify-content-center'>
          {types.map(ptype => (<h6 className='mx-1' style={{backgroundColor : colorType[ptype.type.name],padding:"5px",borderRadius:"4px"}}>{capitalizeName(ptype.type.name)}</h6>) )}
        </div>
    </div>
    
  )
}

export default Pokemon