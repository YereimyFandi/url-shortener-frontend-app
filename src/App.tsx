import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import StatsPage from "./pages/StatsPage"

import HomePage from "./pages/HomPage"

import RedirectPage from "./pages/RedirectPage"

import NotFoundPage from "./pages/NotFoundPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/stats/:code"element={<StatsPage />}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}