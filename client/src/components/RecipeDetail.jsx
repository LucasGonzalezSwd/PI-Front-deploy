import Card from "./Card"
import {useParams} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipesById } from "../redux/actions"
import Loading from "./Loading"


export default function RecipeDetail(){

    let {idRecipe} = useParams()
    const dispatch = useDispatch()
    let recipe = useSelector(store => store.recipe)
    

    useEffect(()=>{
        dispatch(getRecipesById(idRecipe))
       
    })
    return(
        <div>
            {
              
                    recipe.id ? <Card recipe={recipe} />
                    : <div>
                        
                        <Loading/>
                    </div>

                   
               
            }
        </div>
    )
}