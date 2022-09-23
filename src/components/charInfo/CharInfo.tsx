import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errors/error";
import Spinner from "../spinner/Spinner";

interface CharInfoProps {
    selectedId: any;
}

interface CharInfoState {
    character: any,
    loading: boolean,
    error: boolean
}

class CharInfo extends Component<CharInfoProps, CharInfoState> {
    state = {
        character: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharacter();
    }

    componentDidUpdate(prevProps: Readonly<CharInfoProps>, prevState: Readonly<CharInfoState>) {
        if (this.props.selectedId !== prevProps.selectedId) {
            this.updateCharacter();
        }
    }

    updateCharacter = () => {
        const { selectedId } = this.props;
        if (!selectedId) {
            return;
        }

        this.onLoading();

        this.marvelService
            .getCharacter(selectedId)
            .then(this.onCharacterLoad)
            .catch(this.onError);
    }

    onCharacterLoad = (character: any) => {
        const { name, description, thumbnail, homepage, wiki, comics } = character;
        this.setState({
            character: {
                name,
                description,
                thumbnail,
                homepage,
                wiki,
                comics,
            },
            loading: false
        })
    }

    onLoading = () => {
        this.setState({
            loading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const { character, loading, error } = this.state;
        const skeleton = character || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !character) ? <View character={character}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {content}
                {spinner}
            </div>
    )}
}


function View(props: any) {
    let {character} = props;
    const {name, description, homepage, wiki, thumbnail, comics} = character;

    const img = (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
        ? <img src={thumbnail} style={{objectFit: "contain"}} alt={name} className="randomchar__img"/>
        : <img src={thumbnail} alt="Random character" className="randomchar__img"/>;

    const correctDescription = (description === "")
                                ? <div>This character has no description yet.</div> : description;

    return (
        <>
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
                {correctDescription}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : <div>This character does not have any comics.</div>}
                {comics.map((item: any, i: number) => {
                    // eslint-disable-next-line array-callback-return
                    if (i > 9) return;
                    return (
                        <li className="char__comics-item" key={i}>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}


export default CharInfo;