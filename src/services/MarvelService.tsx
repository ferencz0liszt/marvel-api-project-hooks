import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=2bd0b149ee4a69238b62969f2594fc44';
    const _baseOffset = 340;
    const _baseLimit = 9;

    // 2bd0b149ee4a69238b62969f2594fc44 - chrome
    // d3873c8e78b189295466bbb197dff8f2 - chrome.dev

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=${_baseLimit}&offset=${offset}&${_apiKey}`);

        return res.data.results.map((item: {}) => {
            return _transformCharacter(item)
        });
    }

    const getCharacter = async (id: number) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset: number = 10, limit: number = 8) => {
        const res = await request(`${_apiBase}comics?hasDigitalIssue=true&limit=${limit}&offset=${offset}&${_apiKey}`);

        return res.data.results.map((item: {}) => {
            return _transformComics(item)
        });
    }

    const _transformComics = (comics: any) => {
        // const price = comics.prices.price === 0 ? 'Not available' : comics.prices.price;
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            // price: { price }
        }
    }

    const _transformCharacter = (character: any) => {
        return {
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            id: character.id,
            comics: character.comics.items,
        }
    }

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        getAllComics,
        clearError,
    }

}

export default useMarvelService;