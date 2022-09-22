import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";

interface AppState {
    selectedId: null | number
}

class App extends Component<any, AppState> {
    state = {
        selectedId: null
    }

    onSelect = (id: number) => {
        this.setState({
            selectedId: id
        })

    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onSelect={this.onSelect}/>
                        <CharInfo selectedId={this.state.selectedId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;