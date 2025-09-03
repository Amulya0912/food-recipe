import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Mealcards from './Mealcards';


const Mealinfo = () => {
    const { mealid } = useParams();
    const [info, setInfo] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const ingredient = query.get("ingredient");

    useEffect(() => {
        const getInfo = async () => {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
            const jsonData = await res.json();
            setInfo(jsonData.meals[0]);
        };

        if (mealid) {
            getInfo();
        }
    }, [mealid]);

    //Counting the ingredients
    const countIngredients = (meal) => {
        let count = 0;
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) count++;
        }
        return count;
    };

    //Estimate time based on number of ingredients
    const estimateTime = (meal) => {
        const ingredients = countIngredients(meal);
        if (ingredients <= 5) return "15 mins";
        if (ingredients <= 10) return "30 mins";
        return "45+ mins";
    };

    return (
        <div>
            {!info ? (
                ""
            ) : (
                <div className="mealInfo" style={{ position: "relative" }}>
                    <button
                        onClick={() => navigate(ingredient ? `/search/${ingredient}` : "/")}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "transparent",
                            border: "none",
                            fontSize: "24px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: "#333"
                        }}
                    >
                        ✖
                    </button>
                    <img src={info.strMealThumb} alt={info.strMeal} />
                    <div className="info">
                        <h1>Recipe Details</h1>
                        <button>{info.strMeal}</button>


                        <p><strong>Estimated Time:</strong> {estimateTime(info)}</p>

                        <h3>Instructions</h3>
                        <p>{info.strInstructions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mealinfo;
