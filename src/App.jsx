import './App.css'
import PokemonDetails from './Components/PokemonDetails'
import PokemonList from './Components/PokemonList'
import { BrowserRouter as Router, Routes,Route,} from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<PokemonList/>}/>
      <Route path='/pokemon/:id' element={<PokemonDetails/>}/>
      </Routes>
      

    </Router>
    </>
  )
}

export default App
