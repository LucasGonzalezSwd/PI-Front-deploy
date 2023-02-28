import { Link } from "react-router-dom";
import "./Styles/Landing.css"


export default function Landing(){
     return(
        <>
          <div id="container_landing">
               <div id="cont">
                <h1>WELCOME</h1>
                <Link to="/home"> 
                      <button>SEE RECIPES</button>
                 </Link>
                 </div>
          </div>
        </>
     )
}