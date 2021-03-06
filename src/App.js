import "./App.css";
import { BrowserRouter as Routes, Switch, Route } from "react-router-dom";

//Pages Components
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/create">
            <Create />
          </Route>

          <Route path="/search">
            <Search />
          </Route>

          <Route path="/recipes/:id">
            <Recipe />
          </Route>
        </Switch>
      </Routes>
    </div>
  );
}

export default App;
