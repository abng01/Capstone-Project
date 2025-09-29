import { Routes, Route } from 'react-router-dom'
import BrowsePage from '../pages/BrowsePage'
import ViewPage from '../pages/ViewPage'

export default function AppRoutes(props) {
    return(
        <Routes>
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/view">
                <Route path=":id" element={<ViewPage />} />
            </Route>
        </Routes>
    )
}