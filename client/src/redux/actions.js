import {GET_ALL_RECIPES,
     GET_ALL_DIETS,
     GET_RECIPES_ID,
     GET_RECIPES_NAME,
     FILTER_TYPE_DIETS,
     ORDER_ALPHA,
     ORDER_SCORE,
     DELETE_RECIPE,
     CREATE_OR_NOT,
     ORDERLESS_FIVE
     } from './actionType'
import axios from 'axios'


export function getAllRecipes(){
     return async function(dispatch){
        const re = await axios.get('http://localhost:3001/recipes')
          return dispatch({
              type: GET_ALL_RECIPES,
              payload: re.data
              
           })
     }
}

export function getAllDiets(){
     return async function(dispatch){
        const re = await axios('http://localhost:3001/diets')
         dispatch({
            type: GET_ALL_DIETS,
            payload: re.data
         })
     }
}


export function getRecipesById(id){
      return async function(dispatch){
        const re = await axios(`http://localhost:3001/${id}`)
        dispatch({
            type: GET_RECIPES_ID,
            payload: re.data
        })
      }
}

export function getRecipesByName(name){
     return async function(dispatch){
        const re = await axios(`http://localhost:3001/recipes?name=${name}`)
        dispatch({
             type: GET_RECIPES_NAME,
             payload: re.data
        })
     }
}

export function filterTypeDiets(payload){
        return{
             type: FILTER_TYPE_DIETS,
             payload
        }
}

export function orderAlphabetically(payload){
    return{
         type: ORDER_ALPHA,
         payload
    }
}

export function orderHealthScore(payload){
    return{
         type: ORDER_SCORE,
         payload
    }
}
export function orderLessFive(payload){
     return{
          type: ORDERLESS_FIVE,
          payload
     }
 }
export function createOrNot(payload){
     return{
          type: CREATE_OR_NOT,
          payload,
     }
 }


export function createRecipe(payload){
     return async function(dispatch){
        await axios.post('http://localhost:3001/recipe', payload)
     }
}

export function deleteRecipe(id){
     return async function(dispatch){
         await axios.delete(`http://localhost:3001/recipe/${id}`)
         dispatch({
             type: DELETE_RECIPE,
             payload: id
         })
     }
 }







