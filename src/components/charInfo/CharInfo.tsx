import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

interface CharInfoProps {
    selectedId: any;
}

interface CharInfoState {
    character: {
        name: string | null | undefined,
        description: string | null | undefined,
        thumbnail: string | null | undefined,
        homepage: string | null | undefined,
        wiki: string | null | undefined,
    }
    loading: boolean,
    error: boolean
}

class CharInfo extends Component<CharInfoProps, CharInfoState> {
    state = {
        character: {
            name: undefined,
            description: undefined,
            thumbnail: undefined,
            homepage: undefined,
            wiki: undefined,
        },
    loading: true,
    error: false
    }

    marvelService = new MarvelService();

    updateCharacter = () => {
        const { selectedId } = this.props;
        if (!selectedId) {
            return;
        }

        this.marvelService
            .getCharacter(selectedId)
            .then(this.onCharacterLoad)
            .catch(this.onError);
    }

    onCharacterLoad = (character: any) => {
        const { name, description, thumbnail, homepage, wiki } = character;
        this.setState({
            character: {
                name,
                description,
                thumbnail,
                homepage,
                wiki
            },
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    viewCharacter = () => {
        const {character: {name, description, homepage, wiki, thumbnail}} = this.state;
        const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
            ? <img src={thumbnail} style={{objectFit: "contain"}} alt={name} className="randomchar__img"/>
            : <img src={thumbnail} alt="Random character" className="randomchar__img"/>;

        return (
            <div className="char__info">
                <div className="char__basics">
                    {img}
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
            </div>
        )
    }

    render() {
        const ViewCharacter = this.viewCharacter();
        return (
            <>
                {ViewCharacter}
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    <li className="char__comics-item">
                        All-Winners Squad: Band of Heroes (2011) #3
                    </li>
                    <li className="char__comics-item">
                        Alpha Flight (1983) #50
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #503
                    </li>
                    <li className="char__comics-item">
                        Amazing Spider-Man (1999) #504
                    </li>
                    <li className="char__comics-item">
                        AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
                    </li>
                    <li className="char__comics-item">
                        Vengeance (2011) #4
                    </li>
                    <li className="char__comics-item">
                        Avengers (1963) #1
                    </li>
                    <li className="char__comics-item">
                        Avengers (1996) #1
                    </li>
                </ul>
            </>
    )}
}


export default CharInfo;