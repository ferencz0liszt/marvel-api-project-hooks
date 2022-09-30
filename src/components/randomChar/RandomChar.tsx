import './randomChar.scss';
import {Component, FC, useEffect, useState} from "react";

import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errors/error";
import ErrorBoundary from "../errorBoundaries/errorBoundary";


interface characterState {
    name: string | undefined,
    description: string | undefined,
    thumbnail: string | undefined,
    homepage: string | undefined,
    wiki: string | undefined,
}

const RandomChar: FC = (props) => {

    const [ character, setCharacter ] = useState<characterState>({
        description: undefined,
        homepage: undefined,
        name: undefined,
        thumbnail: undefined,
        wiki: undefined
    });

    const MarvelService = useMarvelService();
    const { loading, error } = MarvelService;

    useEffect(() => {
        updateCharacter();
    }, [])

    const onCharacterLoad = (character: any) => {
        if (character.description === '') {
            character.description = "This character haven't got a description yet."
        } else if (character.description.length >= 160) {
            character.description = character.description.slice(0, 159) + '...';
        }
        this.setState({character, loading: false});
    }

    const onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    const updateCharacter: any = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.MarvelService
            .getCharacter(id)
            .then(this.onCharacterLoad)
            .catch(this.onError);
    }

    const newRandomCharacter = () => {
        this.setState({error: false, loading: true});
        this.updateCharacter();
    }
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View character={character}/> : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    className="button button__main"
                    onClick={() => newRandomCharacter()}
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}


interface ViewProps {
    character: any;
}

const View: FC<ViewProps> = ({character}) => {
    const { name, description, thumbnail, homepage, wiki } = character;
    const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
        ? <img src={thumbnail} style={{objectFit: "contain"}} alt="Random character" className="randomchar__img"/>
        : <img src={thumbnail} alt="Random character" className="randomchar__img"/>;

    return(
        <ErrorBoundary>
            <div className="randomchar__block">
                {img}
                <div className="randomchar__info">
                    <p className="randomchar__name">
                        {name}
                    </p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default RandomChar;