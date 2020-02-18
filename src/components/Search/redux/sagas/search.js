import { takeLatest, put, call , debounce } from 'redux-saga/effects';
import { updateSearchState } from '../actions';
import { UriHelper } from '../../../../utils/UriHelper';
import _ from 'lodash';
import types from '../types';
import axios from 'axios';

function* callSearchStockTickerAPI(term) {
    const options = {
        url: `${UriHelper('SYMBOL_SEARCH')}&keywords=${term}`,
        method: 'get'
    };

    try {
        const response = yield axios.request(options);
        return _.get(response, 'data.bestMatches');
    } catch (e) {
        return false;
    }
}

function* setSearchStockTicker({ term }) {
    yield put(updateSearchState('searchTerm', term));
    const matches = yield call(callSearchStockTickerAPI, term);
    if (!matches) return;

    if (matches.length > 0) {
        yield put(updateSearchState('searchResults', matches));
    }
}

function* watchSearchStockTicker() {
    yield debounce(1000, types.WATCH_SEARCH_TICKER_DATA, setSearchStockTicker);
}

export default watchSearchStockTicker;