import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './components/Search/search.css';
import './components/Chart/chart.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
