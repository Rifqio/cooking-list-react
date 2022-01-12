import './Home.css'
import RecipeList from '../../components/RecipeList/RecipeList'

import { Text } from '@chakra-ui/react'
import { projectStorage } from '../../server/config'
import { useEffect, useState } from 'react'


function Home() {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsPending(true)

        const unsub = projectStorage.collection('recipes').onSnapshot((snap) => {
            if(snap.empty) {
                setError('No data to load')
                setIsPending(false)
            } else {
                let result = []
                snap.docs.forEach(doc => {
                    result.push({ id: doc.id, ...doc.data() })
                })
                setData(result)
                setIsPending(false)
            }
        }, (err) => {
            setError(err.message)
            setIsPending(false)
        })

        return () => unsub()
    }, [])

    return (
        <div className="home">
            {error && <Text className='error'>{error}</Text> }
            {isPending && <Text className='loading'>Loading ...</Text>}
            <RecipeList data={data} />
        </div>
    )
}

export default Home
