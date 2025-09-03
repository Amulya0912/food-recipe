import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Mealcards = ({ detail }) => {
    const location = useLocation();
    const ingredient = location.pathname.startsWith("/search/")
        ? location.pathname.split("/")[2]
        : null;
    // console.log(detail);
    return (
        <div className='meals'>
            {!detail ? " " : detail.map((curItem) => {
                return (
                    <div className='mealImg' key={curItem.idMeal}>
                        <img src={curItem.strMealThumb} alt={curItem.strMeal} />
                        <p>{curItem.strMeal}</p>
                        <NavLink to={`/meal/${curItem.idMeal}${ingredient ? `?ingredient=${ingredient}` : ""}`}>
                            <button>Recipe</button>
                        </NavLink>
                    </div>
                )

            })
            }

        </div>
    )
}

export default Mealcards
