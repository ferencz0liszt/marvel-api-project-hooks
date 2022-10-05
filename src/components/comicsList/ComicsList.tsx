import './comicsList.scss';

import {FC, useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../errors/error";

const ComicsList: FC = () => {

    const { error, loading, getAllComics } = useMarvelService();
    const [ comics, setComics ] = useState<any[]>([]);
    const [ loadingMore, setLoadingMore ] = useState<boolean>(false)

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset?: any) => {
        getAllComics(offset)
            .then(onComicsLoad);

        setLoadingMore(false);
    }

    const onComicsLoad = (newComics: any[]) => {
        setComics([...comics, ...newComics]);
    }

    const comicsView = comics.map((item) => {
        console.log(item);
        const { title, id, thumbnail, price } = item;
        return (
            <li className="comics__item"
                key={id}
            >
                <a href="#">
                    <img src={thumbnail} alt="title" className="comics__item-img"/>
                    <div className="comics__item-name">{title}</div>
                    <div className="comics__item-price">{price}</div>
                </a>
            </li>
        )
    });

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsView}
            </ul>
            {loading || loadingMore ? <Spinner/> : null}
            {error ? <Error/> : null}
            <button className="button button__main button__long">
                <div className="inner"
                     onClick={() => onRequest((offset: number) => offset + 8)}
                >
                    load more
                </div>
            </button>
        </div>
    )
}

export default ComicsList;