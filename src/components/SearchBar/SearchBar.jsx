import './SearchBar.css'
import { FormLabel, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'


function SearchBar() {
    const [term, setTerm] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?q=${term}`)
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <Input type="text" className='mr-4' variant='filled' placeholder="Search" id="search" onChange={(e)=> setTerm(e.target.value)} />
            </form>
        </div>
    )
}

export default SearchBar
