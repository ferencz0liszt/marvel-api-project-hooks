import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import {useState} from "react";

const MainPage = () => {
    const [ selectedId, setSelectedId] = useState<number | null>(null);

    const onSelect = (id: number) => {
        setSelectedId(id);
    }
    return(
        <>
            <RandomChar/>
            <div className="char__content">
                <CharList onSelect={onSelect}/>
                <CharInfo selectedId={selectedId}/>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
            eslint-disable-next-line react/jsx-no-undef
        </>

    )
}

export default MainPage;