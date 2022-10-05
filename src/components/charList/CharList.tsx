import './charList.scss';
import {FC, useEffect, useRef, useState} from "react";

import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errors/error";


interface CharListProps {
    onSelect: (id: number) => void;
}

const CharList: FC<CharListProps> = (props) => {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(310);
    const [charactersEnded, setCharactersEnded] = useState<boolean>(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onUse(offset, false);
    }, []);

    const onUse = (offset: number, initial: boolean) => {
        initial ? setLoadingMore(true) : setLoadingMore(false)
        getAllCharacters(offset)
            .then(onCharactersLoad)
    }

    const onCharactersLoad = (newCharacters: any[]) => {
        let ended = false;
        if (newCharacters.length < 9) {ended = true;}

        setCharacters((characters) => [...characters, ...newCharacters]);
        setLoadingMore( false);
        setOffset((offset) => offset + 9);
        setCharactersEnded(ended);
    }

    const itemRefs = useRef<any>([]);

    const focusOnItem = (index: number) => {
        itemRefs.current.forEach((item: any) => item.classList.remove('char__item_selected'));
        itemRefs.current[index].classList.add('char__item_selected');
        itemRefs.current[index].focus();
    }

    const itemView = (charactersList: any[]) => {
        const { onSelect } = props;

        const items = charactersList.map((item: {name: string, thumbnail: string, id: number}, index) => {
            const { name, thumbnail, id } = item;
            const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
                ? <img src={thumbnail} style={{objectFit: "contain"}} alt={name} className="char__img"/>
                : <img src={thumbnail} alt={name} className="char__img"/>;

            return (
                <li className="char__item"
                    key={id}
                    tabIndex={0}
                    ref={(ref) => {itemRefs.current[index] = ref}}
                    onClick={() => {
                        onSelect(id);
                        focusOnItem(index);
                    }}>
                    {img}
                    <div className="char__name">{name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = itemView(characters);

    return (
        <div className="char__list">
            {items}
            {(loading || loadingMore) ? <Spinner/> : null}
            {(error) ? <ErrorMessage/> : null}
            <button
                className="button button__main button__long"
                disabled={loadingMore}
                style={(charactersEnded) ? {display: "none"} : {display: "block"}}
                onClick={() => onUse(offset, true)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;