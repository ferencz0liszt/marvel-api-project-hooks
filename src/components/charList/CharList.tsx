import './charList.scss';
import {Component} from "react";

import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errors/error";


interface CharListState {
    characters: any[],
    error: boolean,
    loading: boolean,
}

class CharList extends Component<any, CharListState> {
    state = {
        characters: [],
        error: false,
        loading: true,
    }

    MarvelService = new MarvelService();

    onError = () => {
        this.setState({error: true, loading: false})
    }

    onCharactersLoad = (characters: any[]) => {
        this.setState({characters, loading: false});
    }

    componentDidMount() {
        this.MarvelService
            .getAllCharacters()
            .then(this.onCharactersLoad)
            .catch(this.onError);
    }

    itemView = () => {
        return this.state.characters.map((item) => {
            const { name, thumbnail, id } = item;

            const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
                ? <img src={thumbnail} style={{objectFit: "contain"}} alt={name} className="randomchar__img"/>
                : <img src={thumbnail} alt={name} className="randomchar__img"/>;

            return(
                <ul className="char__grid">
                    <li className="char__item" key={id}>
                        {img}
                        <div className="char__name">{name}</div>
                    </li>
                </ul>
            )
        });
    }

    render() {
        const { error, loading } = this.state;

        return (
            <div className="char__list">
                {!(loading || error) ? this.itemView() : null}
                {(loading) ? <Spinner/> : null}
                {(error) ? <ErrorMessage/> : null}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;