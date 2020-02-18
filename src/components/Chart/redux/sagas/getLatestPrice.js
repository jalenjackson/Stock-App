import { takeLatest, put, call } from 'redux-saga/effects';
import { UriHelper } from '../../../../utils/UriHelper';
import { updateChartState } from '../actions';
import axios from 'axios';
import _ from 'lodash';
import types from '../types';

function* callGetLatestPriceAPI(ticker) {
    try {
        const options = {
            url: `${UriHelper('GLOBAL_QUOTE')}&symbol=${ticker}`,
            method: 'get'
        };

        const response = yield axios.request(options);

        if (_.get(response, 'data.Note')) {
            return 'exceeded';
        } else {
            const quote = _.get(response, 'data.Global Quote');
            if (quote) {
                return {
                    price: quote['05. price'],
                    change: quote['05. price'] - quote['08. previous close']
                };
            }
        }
    } catch (e) {
        return {};
    }
}

function* setGetLatestPrice({ ticker }) {
    yield put(updateChartState('loadingLatestPrice', true));
    yield put(updateChartState('latestPriceExceeded', false));

    const latestPrice = yield call(callGetLatestPriceAPI, ticker);
    yield put(updateChartState('loadingLatestPrice', false));

    if (latestPrice === 'exceeded') {
        return yield put(updateChartState('latestPriceExceeded', true));
    } else {
        yield put(updateChartState('latestPriceExceeded', false));
    }

    if (latestPrice) {
        return yield put(updateChartState('latestPrice', latestPrice));
    }
}

function* watchGetLatestPrice() {
    yield takeLatest(types.WATCH_GET_LATEST_PRICE, setGetLatestPrice);
}

export default watchGetLatestPrice;