import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
// styles
import './Navbar.css'
import SearchBar from './SearchBar/SearchBar'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1 className="text-3xl font-semibold">Cooking Session</h1>
        </Link>
        <SearchBar />
        <Link to="/create"> <Button colorScheme='facebook' >Create Recipe</Button></Link>
      </nav>
    </div>
  )
}