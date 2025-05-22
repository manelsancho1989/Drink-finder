import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import FavoritesPage from "./views/FavoritesPage"
import Layout from "./layouts/Layout"

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>

                    <Route path="/" element={
                        <Suspense fallback="Loading...">
                            <IndexPage />
                        </Suspense>
                    } index />
                    <Route path="/favorites" element={
                        <Suspense fallback="Loading...">
                            <FavoritesPage />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}
