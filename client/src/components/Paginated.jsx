
import './Styles/Paginated.css'


export default function Paginated({recipes,quantityRecipe,page}){
   
     
     const numPage = []
     for (let i = 1; i <= Math.ceil(recipes / quantityRecipe); i++) {
      numPage.push(i);
    }

     return (
      <nav className="nav_c">
      <ul className="list">
        {numPage &&
          numPage.map((number) => (
            <li
              className="listChildren"
              key={number}
              onClick={() => page(number)}
            >
              {number}
            </li>
          ))}
      </ul>
    </nav>
     )
}