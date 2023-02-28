import {GET_ALL_RECIPES,
    GET_ALL_DIETS,
    GET_RECIPES_ID,
    GET_RECIPES_NAME,
    FILTER_TYPE_DIETS,
    ORDER_ALPHA,
    ORDER_SCORE,
    CREATE_RECIPE,
    DELETE_RECIPE,
    CREATE_OR_NOT,
    ORDERLESS_FIVE
    
    } from './actionType'

const initialState = {
    allRecipes: [],
    recipecop: [],
    recipecop2:[],
    recipes: [],
    recipe: [],
    diets: []
}

function orderAscen(array,prop){ // menor a mayor
     let newArr = array.sort((a,b)=>{
                       //1
         if(a[prop] > b[prop]) return 1
             //-1
         if(a[prop] < b[prop]) return -1
         return 0
     })
     return newArr
}

function orderDescen(array,prop){ // de mayor a menor
    let newArr = array.sort((a,b)=>{
        if(a[prop] > b[prop]) return -1
        if(a[prop] < b[prop]) return 1
        return 0
    })
    return newArr
}


export default function rootReducer(state = initialState, action){
        
          switch (action.type) {
                case GET_ALL_RECIPES: 
                  return{
                     ...state,
                     allRecipes: action.payload,
                     recipecop: action.payload,
                     recipes: action.payload,
                     recipecop2: [...action.payload],
                     recipe: [...action.payload] // recipe-id
                  }
                

                case GET_ALL_DIETS: 
                 return{
                    ...state,
                    diets: action.payload
                 }

                case GET_RECIPES_ID:
                    return{
                        ...state,
                       recipe: action.payload
                      
                    }  

                case GET_RECIPES_NAME:
                    return{
                        ...state,
                        recipecop: action.payload
                    }
                
                case FILTER_TYPE_DIETS:
                    let recipesByTypeDiets;
                    if(action.payload === "all"){
                         recipesByTypeDiets = [...state.allRecipes]
                    }
                    else{
                        recipesByTypeDiets = state.allRecipes.filter(re => re.diets && (re.diets.name === action.payload || re.diets.includes(action.payload)))
                    }
                     return {
                         ...state,
                        recipecop:recipesByTypeDiets
                     }


                case ORDERLESS_FIVE:
                     let recipesLessFive;
                    if(action.payload === 65 )
                    { 
                     recipesLessFive = state.allRecipes.filter(re => re.healthScore <= 65) 
                     
                       
                    }
                    return {
                        ...state,
                        recipecop: recipesLessFive
                    }
                
                case ORDER_ALPHA:
                    let recipesByAlpha;
                 if(action.payload === "defect"){
                    recipesByAlpha = state.allRecipes.map(recipe=>{
                    let rec;
                    state.recipecop2.map(re=>{
                        if(recipe.name === re.name) rec = re
                    })
                    return rec
                })
                    } else if(action.payload === "ascen"){
                         recipesByAlpha = orderAscen(state.recipecop2, "name").flat(2)
                    }  else{
                        recipesByAlpha = orderDescen(state.recipecop2, "name").flat(2)
                    }
                    return {
                        ...state,
                        recipecop: recipesByAlpha
                    }
                
                case ORDER_SCORE: 
                 let recipeByScore;
                  if(action.payload === "defect"){
                      recipeByScore = state.allRecipes.map(recipe =>{
                         let recipeEq;
                          state.recipecop2.map(re => {
                             if(recipe.name === re.name) recipeEq = re
                          }) 
                          return recipeEq
                      })
                  } else if(action.payload === "ascen"){
                      recipeByScore = orderAscen(state.recipecop2, "healthScore").flat(2)
                  } else {
                    recipeByScore = orderDescen(state.recipecop2, "healthScore").flat(2)
                  }
                  return  {
                         ...state,
                         recipecop : recipeByScore
                  }
                  case CREATE_OR_NOT:
                    const arrF = state.recipecop2;
                    let createForMe = arrF.filter((a) => a.id.length > 20);
                    let createForApi = arrF.filter((a) => a.id > 1);
                   
                    let array =
                      action.payload === "all"
                        ? arrF 
                        : createForMe?.length === 0 
                        ? alert("don't create any recipe yet") 
                        
                        : action.payload === "api"
                        ? createForApi
                        : action.payload === "form"
                        ? createForMe
                        : arrF;
                    return {
                      ...state,
                      recipecop: array
                     
                    };
                
                case CREATE_RECIPE:
                 return {
                    ...state,
                    allRecipes:[action.payload, ...state.allRecipes]
                 }
                 case DELETE_RECIPE:
                    return {
                        ...state,
                       
                        recipecop:state.allRecipes.filter(re => re.id !== action.payload)
                    }
                
            default:
                return state
          }


}