import { useState } from "react"
import { Link } from "react-router-dom"
import imgC from './images/foto4.jpg'
import './Styles/Card.css'

export default function Card({recipe}){
    const [btn , setBtn] = useState(0)
    const styleImg = {
        backgroundImage: `url(${recipe.image? recipe.image : imgC})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: recipe.image? "cover" : "cover",
        outlineOffset: recipe.image? "-8px" : "0px"
    }

  
    
     return (
        <div className="card_container">
            <div className="card_nav">
                <div className="card_button">
                     <Link to="/home"> 
                        <button>
                        <h1>BACK TO MENU</h1>
                        </button> 
                    </Link>
                </div>
                <div className="card_title">
                    <h1>{recipe.name}</h1>
                </div>
            </div>
            <div className="cardl_data">
               
                 <p>Diets: {recipe.diets.join("  -  ")}</p>
                <p>Health Score: {recipe.healthScore}</p>
            </div>

            <div className="card_img_data">
                <div className="card_img" style={styleImg}></div>
                <div className="card_data" >
                    <h3>{btn ? "STEPS FOR THE PREPARATION" : "SUMMARY OF THE DISH"}</h3>
                    <div className="data" >
                        {
                            btn ? <ol>
                                {
                                    recipe.steps.length ? recipe.steps.map(s =>{
                                        return (
                                            <div key={recipe.id}>

                                                <li >{s}</li>
                                            </div>
                                        )
                                    })
                                    : <p>No steps have been added for this recipe.</p>
                                }
                            </ol>
                            :
                            <p>
                                {
                                    recipe.summary ? recipe.summary.replace(/<[^>]+>/g, '')
                                    : <p>No summary have been added for this recipe.</p>
                                }
                            </p>
                        }
                    </div>
                    <div id="cont_btn_data">
                        <button id="btn_data" onClick={()=>{setBtn(1-btn)}}>
                            {btn ? "SEE SUMMARY" : "SEE PREPARATION" }
                        </button>
                    </div>
                </div>
            </div>

        </div>
     )
}