//Hooks
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { projectStorage } from '../../server/config'
//Styles
import {
  Text,
  Heading,
  Badge,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import "./Recipe.css";

function Recipe() {
  const { id } = useParams();
  const redirect = useHistory();

  const [recipe, setRecipe] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true)

    projectStorage.collection('recipes').doc(id).get().then((doc) => {
      if(doc.exists){
        setIsPending(false)
        setRecipe(doc.data())
      } else {
        setIsPending(false)
        setError('Could not find the recipe')
      }
    })    
  }, [id])
  

  //Redirect user if id is not found
  useEffect(() => {
    if (error) {
      redirect.push("/");
    }
  }, [error, redirect]);

  return (
    <div className="recipe">
      {isPending && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      <div key={recipe.id}>
        <Heading className="page-title">
          {recipe.title} <Badge colorScheme="green">{recipe.cookingTime}</Badge>
        </Heading>
        <UnorderedList>
          {recipe.ingredients && recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
        </UnorderedList>

        <Text className="method">{recipe.method}</Text>
      </div>
    </div>
  );
}

export default Recipe;
