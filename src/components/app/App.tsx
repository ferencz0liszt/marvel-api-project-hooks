import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { useState } from "react";

const App = () => {

    const [ selectedId, setSelectedId] = useState<number | null>(null);

    const onSelect = (id: number) => {
        setSelectedId(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<RandomChar/>*/}
                {/*<div className="char__content">*/}
                {/*    <CharList onSelect={onSelect}/>*/}
                {/*    <CharInfo selectedId={selectedId}/>*/}
                {/*</div>*/}
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;