import { Routes, Route } from 'react-router-dom'
import BrowsePage from '../pages/BrowsePage'
import ViewPage from '../pages/ViewPage'
import RandomPage from "../pages/RandomPage"
import ArchivePage from '../pages/ArchivePage'
import { useState } from 'react'
import LoginPage from '../pages/LoginPage'
import DashboardPage from '../pages/DashboardPage'
import SignupPage from '../pages/SignupPage'

export default function AppRoutes(props) {
    const [randomNum, setRandomNum] = useState(1)

    const num = () => setRandomNum(Math.floor(Math.random() * 171 + 1))

    return(
        <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/view">
                <Route path=":id" element={<ViewPage />} />
            </Route>
            {/* <Route path="/random" element={<RandomPage />} /> */}
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/signup" element={<SignupPage />} />
        </Routes>
    )
}