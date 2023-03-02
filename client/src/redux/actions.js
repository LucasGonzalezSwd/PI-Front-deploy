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
        const re = await axios.get('pi-back-deploy-production.up.railway.app/recipes')
          return dispatch({
              type: GET_ALL_RECIPES,
              payload: re.data
              
           })
     }
}

export function getAllDiets(){
     return async function(dispatch){
        const re = await axios('pi-back-deploy-production.up.railway.app/diets')
         dispatch({
            type: GET_ALL_DIETS,
            payload: re.data
         })
     }
}


export function getRecipesById(id){
      return async function(dispatch){
        const re = await axios(`pi-back-deploy-production.up.railway.app/${id}`)
        dispatch({
            type: GET_RECIPES_ID,
            payload: re.data
        })
      }
}

export function getRecipesByName(name){
     return async function(dispatch){
        const re = await axios(`pi-back-deploy-production.up.railway.app/recipes?name=${name}`)
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
        await axios.post('pi-back-deploy-production.up.railway.app/recipe', payload)
     }
}

export function deleteRecipe(id){
     return async function(dispatch){
         await axios.delete(`pi-back-deploy-production.up.railway.app/recipe/${id}`)
         dispatch({
             type: DELETE_RECIPE,
             payload: id
         })
     }
 }







