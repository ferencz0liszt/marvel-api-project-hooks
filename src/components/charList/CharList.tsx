import './charList.scss';
import {Component} from "react";

import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errors/error";
import ErrorBoundary from "../errorBoundaries/errorBoundary";

interface CharListState {
    characters: any[],
    error: boolean,
    loading: boolean,
    loadingMore: boolean,
    offset: number,
    charactersEnded: boolean,
}

interface CharListProps {
    onSelect: (id: number) => void;
}

class CharList extends Component<CharListProps, CharListState> {
    state = {
        characters: [],
        error: false,
        loading: true,
        loadingMore: false,
        offset: 1600,
        charactersEnded: false,
    }

    MarvelService = new MarvelService();

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    onCharactersLoad = (newCharacters: any[]) => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            loadingMore: false,
            offset: offset + 9,
            charactersEnded: ended,
        }));
    }

    onLoadingMore = () => {
        this.setState({loadingMore: true})
    }

    componentDidMount() {
        this.MarvelService
            .getAllCharacters()
            .then(this.onCharactersLoad)
            .catch(this.onError);
    }

    loadMore = () => {
        this.onLoadingMore();
        this.MarvelService
            .getAllCharacters(this.state.offset)
            .then(this.onCharactersLoad)
            .catch(this.onError);
    }

    itemView = () => {
        const { onSelect } = this.props;
        const items = this.state.characters.map((item) => {
        const { name, thumbnail, id } = item;

        const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
            ? <img src={thumbnail} style={{objectFit: "contain"}} alt={name} className="randomchar__img"/>
            : <img src={thumbnail} alt={name} className="randomchar__img"/>;

        return(
                <li className="char__item"
                    key={id}
                    onClick={() => onSelect(id)}
                >
                    {img}
                    <div className="char__name">{name}</div>
                </li>
        )
        });
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const { error, loading, loadingMore, charactersEnded } = this.state;

        return (
            <ErrorBoundary>
                <div className="char__list">
                    {!(loading || error) ? this.itemView() : null}
                    {(loading) ? <Spinner/> : null}
                    {(error) ? <ErrorMessage/> : null}
                    <button
                        className="button button__main button__long"
                        disabled={loadingMore}
                        style={(charactersEnded) ? {display:"none"} : {display:"block"}}
                        onClick={() => this.loadMore()}
                    >
                        <div className="inner">load more</div>
                    </button>
                </div>
            </ErrorBoundary>
        )
    }
}

export default CharList;