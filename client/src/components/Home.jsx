import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getAllRecipes,getAllDiets,orderAlphabetically,orderHealthScore,filterTypeDiets,createOrNot,orderLessFive} from '../redux/actions'
import Paginated from './Paginated'
import Cards from './Cards';
import Loading from './Loading';
import SearchBar from './SearchBar'
import './Styles/Home.css'


export default function Home(){
   const dispatch = useDispatch()
  
   const recipes = useSelector((store)=> store.recipecop)
   const diets = useSelector((store) => store.diets)
   const [quantityRecipePage] = useState(9) 
   const [refreshPage, setRefreshPage] = useState(1) 
   const lastRecipe = refreshPage * quantityRecipePage
   const firstRecipe = lastRecipe - quantityRecipePage
   const [, setOrden] = useState(1);
   let currentRecipes = recipes.slice(firstRecipe,lastRecipe)
   
   let index = Math.ceil(recipes.length / quantityRecipePage);
   
   const nav = document.querySelector(".home_navbar_f")
   
   const openNavBar = () =>{
     nav.classList.add("active")
    }
    const closeNavBar = () =>{
      nav.classList.remove("active")
    }
    
    useEffect(()=>{
      dispatch(getAllRecipes())
      dispatch(getAllDiets())
      
    },[dispatch])

  function reloadHandler(e){
    
    dispatch(getAllRecipes())
  }
 
  const page = (pageNumber) => {
    setRefreshPage(pageNumber);
  };

  const nextHandler = () => {
    if (refreshPage >= index) return;
    setRefreshPage(refreshPage + 1);
    console.log(refreshPage);
  };

  const prevHandler = () => {
    if (refreshPage === 1) return;
    setRefreshPage(refreshPage - 1);
    console.log(refreshPage);
  };

  const firstHandler = () => {
    setRefreshPage(1);
  };

  const lastHandler = () => {
    setRefreshPage(index);
  };
  

  function filterDiet(e){
    setRefreshPage(refreshPage)
    dispatch(filterTypeDiets(e.target.value))
    setOrden(`Ordened ${e.target.value}`);
  }

  function alphaOrder(e){
    setRefreshPage(refreshPage )
    dispatch(orderAlphabetically(e.target.value))
    setOrden(`Ordened ${e.target.value}`);
  }
  function scoreOrder(e){
    setRefreshPage(refreshPage)
    dispatch(orderHealthScore(e.target.value))
    setOrden(`Ordened ${e.target.value}`);
  }
  function orderLessSFive(e){
    setRefreshPage(refreshPage)
    dispatch(orderLessFive(e.target.value))
    setOrden(`Ordened ${e.target.value}`);
  }
  
  const createsOrNot = (e) => {
   
    setRefreshPage(refreshPage)
    dispatch(createOrNot(e.target.value));
    setOrden(`Ordened ${e.target.value}`);
  };

  
  return (
    <div className="container_home">
             <div className="navbar_home" >
               
               <div className="home_navbar_up" >
                     <SearchBar  />
                     <h1>RECIPES MENU'S</h1>
                     <Link to="/recipecreate">
                          <button id="recipe_create">
                              <h1>CREATE RECIPE</h1>
                          </button>
                     </Link>
                    
               </div>
             
              <button id="open_nav" onClick={()=>{openNavBar()}}>___<br />___<br />___</button>

              <div className="home_navbar_f">
                <button id="close_nav" onClick={()=>{closeNavBar()}}>X</button>
                    
                    <button onClick={(e)=>{reloadHandler(e)}}>
                        <h1>RELOAD ALL THE RECIPES</h1>
                    </button>
                 
                 <div>
                     <label>DIET TYPE</label>
                     <select onChange={(e)=> {filterDiet(e)}}>
                         <option value="all">ALL DIETS</option>
                         {
                           diets && diets.map(d=>{
                             return(
                               
                               <option key={d.id} 
                               value={d.name.toLowerCase()} >
                                  {d.name.toUpperCase()}
                                  </option>
                                   
                                   )
                                  })
                                }
                     </select>
                 </div>

                 <div>
                    <label>ALPHABETICAL ORDER</label>
                    <select onChange={(e)=>{alphaOrder(e)}}>
                        <option value="defect">DEFAULT</option>
                        <option value="ascen">A - Z</option>
                        <option value="descen">Z - A</option>
                    </select>
                 </div>

                 <div>
                    <label>HEALTHSCORE ORDER</label>
                    <select onChange={(e)=>{scoreOrder(e)}}>
                        <option value="defect">DEFAULT</option>
                        <option value="ascen">1 - 100</option>
                        <option value="descen">100 - 1</option>
                       
                    </select>
                 </div>
                 {/* <div>
                    <label>MENOR A 65</label>
                    <select onChange={(e)=>{orderLessSFive(e)}}>
                    <option value="defect">DEFAULT</option>
                        <option value={65}>T</option>
                        
                       
                    </select>
                 </div> */}

                  <div>
                    <label>RECIPES API OR DB</label>
                    <select onChange={(e)=>createsOrNot(e)}>
                      <option value="all">ALL</option>
                        <option value="api">API RECIPES</option>
                        <option value="form">CREATED RECIPES</option>
                        
                    </select>
                 </div> 

              </div>
             </div>

            <Paginated   recipes={recipes.length}
                   quantityRecipe={quantityRecipePage}
                   page={page}
              refresh={refreshPage} 
            nextHandler={nextHandler}
            prevHandler={prevHandler}
            firstHandler={firstHandler}
            lastHandler={lastHandler} />
            
          <div className="page_count_cards">
                  {
                     currentRecipes.length?
                    recipes !== "string"?
                    currentRecipes.map(re =>{
                      return(
                        <Cards key={re.id} id={re.id} image={re.image} name={ re.name}
                        healthScore={re.healthScore} 
                        // diets={re && re.diets.map((d) => d ).join(", ")}
                        diets={re.diets}
                        />
                        
                        )
                      })
                    : <h2>{recipes}</h2>
                    : <Loading />
                  }
                  </div>
                    
             </div >
                   

     )
}  