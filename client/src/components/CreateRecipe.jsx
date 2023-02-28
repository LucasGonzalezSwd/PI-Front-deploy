import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { createRecipe, getAllDiets } from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux'
import './Styles/CreateRecipe.css'

export default function CreateRecipe(){
   const allDiets = useSelector(store => store.diets)
   const allRecipes = useSelector(store => store.allRecipes)
   const dispatch = useDispatch() 
const [inputForm, setInputForm] = useState({
    name: "",
    image: "",
    summary: "",
    healthScore: 0,
    steps: [],
    diets: []
})
 const [indexSteps, setIndexSteps] = useState({})
 const [quantitySteps, setQuantitySteps] = useState(1)
 const [error, setError] = useState({})

useEffect(()=>{
    dispatch(getAllDiets())
},[dispatch])

const validate = (input) =>{
     let error = {}
     if(input.name.length >= 0 && !input.name.match(/^[a-zA-Z_]+([a-zA-Z_]+)*$/)){
        error.name = 'Only letters are allowed and no spaces at the end!'
     }else error.name = null
     
     if(input.image.length > 0 && !input.image.match(/^(ftp|http|https):\/\/[^ "]+$/)){
        error.image = 'The image has to be a URL'
     } else error.image = null
     if(input.summary && input.summary.length > 1000){
        error.summary = 'It must contain a maximum of 1000 characters'
     } else error.summary = null
     if(input.healthScore > 100 || input.healthScore < 0){
        error.healthScore = 'It has to be between 0 and 100'
     }else error.healthScore = null

     if(input.diets && input.diets.length === 0){
        error.diets = 'You have to choose at least one diet'
     } else error.diets = null
     return error
}
 
const changeHandler = (e) => {
    const property = e.target.name  
  const value = e.target.value
    setInputForm({
         ...inputForm, 
        [property]:value 
    })
    setError(validate({
        ...inputForm,
        [property]:value
    },allRecipes)) // cambie
} 
const selectHandler =(e) => {
  
    const value = e.target.value
    setInputForm({
        ...inputForm, 
        diets:[...inputForm.diets, value]
   })
   setError(validate({
        ...inputForm, 
        diets:[...inputForm.diets, value]
   }))
}

const deleteSelect = (e,id)=>{
    
    setInputForm({
        ...inputForm,
        diets: inputForm.diets.filter(di => di !== id)
    })
    setError(validate({
        ...inputForm,
        diets: inputForm.diets.filter(di => di !== id)
    }))
}

const submitHandler = (e)=>{
  e.preventDefault()
  if(error.name === null && error.image === null && error.summary === null && error.healthScore === null && error.diets === null){
      dispatch(createRecipe(inputForm))
      alert("The recipe has been created successfully")
      setInputForm({
        name: "",
        image: "",
        summary: "",
        healthScore: 0,
        steps: [],
        diets: []
      })
  }else {
    alert('Fix the marked errors and fill in the required fields')
  }
}

const changeStepsHandler = (e,i)=> {
    const value = e.target.value
    let steps2 = []
    setIndexSteps({
        ...indexSteps,
        [i] : value
    })
    for (let i = 0; i < quantitySteps-1; i++) {
        steps2.push(indexSteps[i])
    }
    setInputForm({
        ...inputForm,
        steps: steps2
    })
}
const addSteps =()=>{  
    let stepsNew = []
    if(quantitySteps <=13){
        setIndexSteps({
            ...indexSteps,
            [quantitySteps]: ''
        })
        for (let i = 0; i < quantitySteps; i++) {
           stepsNew.push(indexSteps[i])
        }
        setQuantitySteps(1+quantitySteps)
        setInputForm({
            ...inputForm,
            steps:stepsNew
        })
    }
}
   return (
    <div id="createrecipe_container">
         <div id="button_home">
              <Link to="/home">
                <button>BACK TO MENU</button>
              </Link>
         </div>
         <div id="form_tittle">
            <h1>Creating Recipe!</h1>
         </div>
         <form onSubmit={(e)=>{submitHandler(e)}} id="create_form">
            <div id="left_form">
                 <div id="input_name" className="input_form">
                    <label htmlFor="name">* Name:</label>
                    <input type="text" value={inputForm.name} name="name" 
                    onChange={(e)=>{changeHandler(e)}}/>
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                 </div>
             
             <div id="input_img" className="input_form">
                 <label htmlFor="iamge"> Image:</label>
                 <input type="text" value={inputForm.image} name="image"
                 onChange={(e)=>{changeHandler(e)}} />
                 {error.image && (
                    <p>{error.image}</p>
                 )}
             </div>
             
             <div id="input_hscore" className="input_form">
                 <label htmlFor="healthScore">* HealthScore:</label>
                 <input type="number" value={inputForm.healthScore} name="healthScore"
                 onChange={(e)=> {changeHandler(e)}}/>
                 {error.healthScore && (
                    <p>{error.healthScore}</p>
                 )}
             </div>

             <div id="input_summary" className="input_form">
                <label htmlFor="summary">Summary:</label>
                <input type="text" value={inputForm.summary} name="summary" 
                onChange={(e)=> {changeHandler(e)}} />
                {error.summary && (
                    <p>{error.summary}</p>
                )} 
             </div>

             <div id="diets_select" className="input_form" >
                <label htmlFor="diets"> * Diets:</label>
                <select onChange={(e)=>{selectHandler(e)}}>
                    <option>Select at least one</option>
                    {allDiets && allDiets.map(d => {
                        return (
                           
                             <option key={d.id}  value={d.id}>{d.name}</option>

                            
                        )
                    })
                }
                </select>
             </div>

             <div id="diets_c">
                <ul>
                    {allDiets && allDiets.map((d)=>{
                        if(inputForm && inputForm.diets.includes(d.id)){
                            return (
                                <li key={d.id} >{d.name} <button onClick={(e)=> {deleteSelect(e, d.id)}}> X </button></li>
                            )
                        }
                        return false;
                    })}
                </ul>
             </div>

             <div id="submit_butt">
                 <button type="submit"> CREATE RECIPE</button>
             </div>
            </div>

            <div id="form_right">
                    <label htmlFor="steps">Steps for the preparation (Max 13):</label>
                    <button onClick={()=>{addSteps()}}>Add Step</button>
                    {
                        indexSteps && inputForm.steps.map((p,i)=>{
                            return (
                                <input key={i} type="text" value={indexSteps[i] || ''} name="steps"
                                onChange={(e)=> {changeStepsHandler(e,i)}} required/>
                            )
                        })
                    }

            </div>
         </form>
    </div>
   )
}