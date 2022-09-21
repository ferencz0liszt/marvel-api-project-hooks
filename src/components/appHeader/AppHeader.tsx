import './appHeader.scss';
import {Component} from "react";

class AppHeader extends Component {
    render() {
        return (
            <header className="app__header">
                <h1 className="app__title">
                    <a href="#">
                        <span>Marvel</span> API application
                    </a>
                </h1>
                <nav className="app__menu">
                    <ul>
                        <li><a href="#">Characters</a></li>
                        /
                        <li><a href="#">Comics</a></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default AppHeader;