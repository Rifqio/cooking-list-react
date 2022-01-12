import "./RecipeList.css";
import Trashcan from '../../assets/delete.svg'
import { Link } from 'react-router-dom'
import { Button, Badge } from '@chakra-ui/react'
import { projectStorage } from '../../server/config'

function RecipeList({ data }) {
  const handleClick = (id) => {
    projectStorage.collection('recipes').doc(id).delete()
  }

  return (
    <div className="recipe-list">
      {data && data.map((recipe) => (
        <div key={recipe.id} className="card">
          <h2 className="font-semibold">{recipe.title}</h2>
          <Badge colorScheme='green'>{recipe.cookingTime}</Badge>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}><Button colorScheme='facebook' variant='outline'>Cook This</Button></Link>
          <img src={Trashcan} className='delete' onClick={() => handleClick(recipe.id)} alt="del" />
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
