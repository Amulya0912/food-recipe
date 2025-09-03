import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Mealcards from './Mealcards';
import oopsimage from '../assets/opps-error.png';

const SearchResults = () => {
    const { ingredient } = useParams();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            setLoading(true); //starts loading
            try {
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
                );
                const data = await res.json();
                if (data.meals) {
                    setMeals(data.meals); // fetched by ingredient
                } else {
                    setMeals([]); //no meals found
                }
            } catch (err) {
                console.error("Error fetching meals:", err);
                setMeals([]);
            } finally {
                setLoading(false); // stop the loading
            }
        };

        fetchMeals();
    }, [ingredient]);

    return (
        <div className="container" style={{ position: "relative" }}>
            <button
                onClick={() => navigate('/')}
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

            {loading ? (
                <div className="loader"></div>
            ) : meals.length === 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "100px",
                        color: "#555",
                        fontSize: "20px"
                    }}
                >
                    <p>No meals found for "{ingredient}"</p>
                    <img
                        src={oopsimage}
                        alt="No meals"
                        style={{ marginTop: "20px", width: "200px", height: "auto" }}
                    />
                </div>
            ) : (
                <>
                    <h1
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                            fontSize: "28px",
                            fontWeight: "bold",
                            color: "#333"
                        }}
                    >
                        Meals with {ingredient}
                    </h1>
                    <Mealcards detail={meals} ingredient={ingredient} />
                </>
            )}
        </div>



    );
};

export default SearchResults;
