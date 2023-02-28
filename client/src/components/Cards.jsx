import {Link} from 'react-router-dom'
import {deleteRecipe} from '../redux/actions'
import {useDispatch} from 'react-redux'
import imgDefault from './images/foto4.jpg'

import './Styles/Cards.css'

export default function Cards({id,image,name,healthScore,diets}){
    const dispatch = useDispatch()
   
    let  styleImage = {
        backgroundImage: `url(${image? image : imgDefault})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: image? 'cover' : 'cover',
    }
    
  
   
    
       
      return(
    
         <div key={id} className="container_cards">
                
              <p>
                Health Score: {healthScore}

                <br />
               
                Diets Type: <br />
               
               {
                  
                     !diets[0]?.Recipe_Diet ? diets.join(", ") 
                     : diets?.map((e)=> <ul className='list_card' id={e.id} key={e.id}><li>{e.name}</li>
                        </ul>)
               
               
               }   
             
                  
                <br />
                 { 
                    id && id.length > 15 ?
                    <button onClick={()=>{dispatch(deleteRecipe(id))}}>Delete</button>
                    : <>  </>
                 }
              </p>
              <Link to={`/recipes/${id}`}>
                   <div className='img' style={styleImage}></div>
                         <div>
                            <h2>{name}</h2>
                         </div>
              </Link>
 

         </div>
      )

 }