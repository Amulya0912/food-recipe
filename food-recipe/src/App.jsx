import React from 'react'
import Mainpage from './Components/Mainpage'
import { Route, Routes } from 'react-router-dom'
import Mealinfo from './Components/Mealinfo'
import Mealcard from './Components/Mealcards'
import Search from './Components/Search'

const App = () => {
    return (

        <Routes>
            {/*route for the main page */}
            <Route path='/' element={<Mainpage />} />
            {/*Route to show meals by searched ingredient */}
            <Route path='/search/:ingredient' element={<Search />} />
            {/* Route for single meal info */}
            <Route path='/meal/:mealid' element={<Mealinfo />} />
        </Routes>

    )
}

export default App
