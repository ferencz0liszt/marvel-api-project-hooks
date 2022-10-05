import AppHeader from "../appHeader/AppHeader";

import { MainPage, ComicsPage } from "../pages/index";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
            <AppHeader/>
            <main>
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="comics" element={<ComicsPage />}/>
                    {/*<Route path="*"  element={}/>*/}
                </Routes>
            </main>
            </BrowserRouter>
        </div>
    )
}

export default App