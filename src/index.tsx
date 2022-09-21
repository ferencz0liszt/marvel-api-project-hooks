import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
// import MarvelService from "./services/MarvelService";

import './style/style.scss';

// const newMarvelService = new MarvelService();
//
// newMarvelService.getAllCharacters().then(res => res.data.results.forEach((item: any) => console.log(item.id)));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

