//Styles
import "../../components/RecipeList/RecipeList.css";

//Hooks
import { Link, useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
//Components
import { Badge, Button } from "@chakra-ui/react";

function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = `http://localhost:5000/recipes?q=${query}`;
  const { data, isPending, error } = useFetch(url);

  if(data.length === 0) {
    return <div className="error">No recipes found!</div>
  }
  return (
    <>
      <h2 className="page-title">Recipes Including "{query}"</h2>
      <div className="recipe-list">
        {error && <p className="error">{error}</p>}
        {isPending && <p className="loading">Loading data...</p>}
        {data.map((recipe) => (
          <div key={recipe.id} className="card">
            <h2 className="font-semibold">{recipe.title}</h2>
            <Badge colorScheme="green">{recipe.cookingTime}</Badge>
            <div>{recipe.method.substring(0, 100)}...</div>
            <Link to={`/recipes/${recipe.id}`}>
              <Button colorScheme="facebook" variant="outline"> Cook This </Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
