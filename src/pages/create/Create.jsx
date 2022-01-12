import './Create.css'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea,
    Button,
    Text
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { projectStorage } from '../../server/config'

function Create() {
    const [title, setTitle] = useState('')
    const [method, setMethod] = useState('')
    const [cookingTime, setCookingTime] = useState('')
    const [newIngredients, setNewIngredients] = useState('')
    const [ingredients, setIngredients] = useState([])
    const ingredientsInput = useRef(null)
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const doc = {
            title,
            method,
            cookingTime: cookingTime + " minutes",
            ingredients,
        };

        try {
           await projectStorage.collection("recipes").add(doc);
           history.push('/')
        } catch (err) {
           console.log(err)
        }
    };

    const handleAdd = (e) => {
        e.preventDefault()
        const ing = newIngredients.trim()

        if (ing && !ingredients.includes(ing)) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredients])
        }
        setNewIngredients('')
        ingredientsInput.current.focus()
    }

    return (
        <div className="create">
            <h2 className="page-title font-semibold text-3xl">Add a new Recipe</h2>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired >
                    <FormLabel>Recipe</FormLabel>
                    <Input className="mb-4" type='text' onChange={(e) => setTitle(e.target.value)} value={title} />

                    <FormLabel>Recipe Ingredients</FormLabel>
                    <div className="ingredients">
                        <Input type="text" onChange={(e) => setNewIngredients(e.target.value)} value={newIngredients} ref={ingredientsInput} />
                        <Button onClick={handleAdd} variant='outline' colorScheme='messenger'>Add</Button>
                    </div>

                    <Text className="mb-4" fontSize='sm' color='gray.500'>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</Text>

                    <FormLabel>Recipe Method</FormLabel>
                    <Textarea className="mb-4" onChange={(e) => setMethod(e.target.value)} value={method} />

                    <FormLabel>Cooking Time (Minutes)</FormLabel>
                    <Input className="mb-4" type='number' onChange={(e) => setCookingTime(e.target.value)} value={cookingTime} />

                    <Button colorScheme='messenger' type="submit" >Submit</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default Create
