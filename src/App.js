import React from 'react';
import RootReducer from './store/RootReducer';
import I18nProvider from './i18n/i18n';
import Home from './components/Home';
import Search from './components/Search';
import createSagaMiddleware from 'redux-saga';
import RootSaga from './store/RootSaga';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(RootSaga);

function App() {
  return (
    <Provider store={store}>
        <I18nProvider>
            <Search />
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </Router>
        </I18nProvider>
    </Provider>
  );
}

export default App;
