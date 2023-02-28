import './App.css';
import {Route} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home'
import RecipeDetail from './components/RecipeDetail';
import CreateRecipe from './components/CreateRecipe';


function App() {
  return (
     <div className="App">
       
       <Route exact path="/" component={Landing}/>
       <Route path="/home" component={Home}/>
       <Route path='/recipes/:idRecipe' component={RecipeDetail}/>
       <Route path='/recipecreate' component={CreateRecipe}/>
      </div>
  );
}

export default App;
