import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="comics" element={<ComicsPage />}/>
                    <Route path="comics/:comicId" element={<SingleComicPage />}/>
                    <Route path="*" element={<Page404 />}/>
                </Routes>
            </main>
            </BrowserRouter>
        </div>
    )
}

export default App