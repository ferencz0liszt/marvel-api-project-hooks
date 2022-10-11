import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicsPage = lazy(() => import('../pages/ComicsPage'));

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<MainPage />}/>
                        <Route path="comics" element={<ComicsPage />}/>
                        <Route path="comics/:comicId" element={<SingleComicsPage />}/>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </Suspense>
            </main>
            </BrowserRouter>
        </div>
    )
}

export default App