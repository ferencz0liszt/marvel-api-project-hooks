import './randomChar.scss';
import {Component, FC} from "react";

import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errors/error";


interface RandomCharState {
    character: {
        name: string | undefined
        description: string | undefined,
        thumbnail: string | undefined,
        homepage: string | undefined,
        wiki: string | undefined,
    },
    loading: boolean,
    error: boolean,
}

class RandomChar extends Component<any, RandomCharState> {
    constructor(props: any) {
        super(props);
        this.updateCharacter();
    }

    state = {
        character: {
            name: undefined,
            description: undefined,
            thumbnail: undefined,
            homepage: undefined,
            wiki: undefined,
        },
        loading: true,
        error: false,
    }

    MarvelService = new MarvelService();

    onCharacterLoad = (character: any) => {
        if (character.description === '') {
            character.description = "This character haven't got a description yet."
        } else if (character.description.length >= 160) {
            character.description = character.description.slice(0, 159) + '...';
        }
        this.setState({character, loading: false});
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter: any = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.MarvelService
            .getCharacter(id)
            .then(this.onCharacterLoad)
            .catch(this.onError);
    }

    newRandomCharacter = () => {
        this.setState({error: false, loading: true});
        this.updateCharacter();
    }

    render() {
        const { character, loading, error} = this.state;
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
                        onClick={() => this.newRandomCharacter()}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
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
    )
}

export default RandomChar;