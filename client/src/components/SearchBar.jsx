import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {getRecipesByName} from '../redux/actions'
import './Styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name,setName] = useState("")
  
    function changeHandler(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function submitHandler(e){
        e.preventDefault();
        dispatch(getRecipesByName(name))
        setName(" ")
    }
  
 
    return (
        <div className="searchbar_c">
             <form onSubmit={(e)=>{submitHandler(e)}}>
                  <button type='submit'>Search</button>
                   <input value={name} onChange={(e)=>{changeHandler(e)}} placeholder="Search recipes.." />
             </form>
        </div>
    ) 

}