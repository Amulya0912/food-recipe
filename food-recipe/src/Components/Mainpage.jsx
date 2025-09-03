import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Mealcards from './Mealcards'

const Mainpage = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleInput = (event) => {
        setSearch(event.target.value)
    }


    useEffect(() => {
        const fetchRandomDishes = async () => {
            setLoading(true); // loading
            try {
                let randomMeals = [];
                for (let i = 0; i < 6; i++) {
                    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                    const json = await res.json();
                    if (json.meals) {
                        randomMeals.push(json.meals[0]);
                    }
                }
                setData(randomMeals);
            } catch (err) {
                console.error('Error fetching random meals:', err);
            } finally {
                setLoading(false); // stop the loading
            }
        };

        fetchRandomDishes();
    }, []);



    const myFun = async () => {
        if (search.trim() === "") {
            // setMsg("Please enter a dish name")
            alert("Please enter a dish name");
            return;

        }
        navigate(`/search/${search}`); //navigate to searched ingredient 

    };



    return (
        <>
            <h1 className='head'>FOOD RECIPE APP</h1>
            <div className='container'>
                <div className='searchBar'>
                    <input type='text' placeholder='Enter Dishes' onChange={handleInput} />
                    <button onClick={myFun}>Search</button>
                </div>
                <h4>{msg}</h4>
                <div>
                    {loading ? (
                        <div className="loader"></div>
                    ) : (
                        <Mealcards detail={data} />
                    )}

                </div>
            </div>
        </>
    )
}


export default Mainpage
