import { takeLatest, call, put } from 'redux-saga/effects';
import { UriHelper } from'../../../../utils/UriHelper';
import { updateChartState } from '../actions';
import axios from 'axios';
import types from '../types';
import _ from 'lodash';

function* callGetChartDataAPI(ticker) {
    const options = {
        url: `${UriHelper('TIME_SERIES_DAILY')}&symbol=${ticker}&interval=1hr`,
        method: 'get'
    };

    try {
        const response = yield axios.request(options);
        return _.get(response, 'data.Time Series (Daily)');
    } catch (e) {
        return {};
    }
}

function* setGetChartData({ ticker }) {
    const chartData = yield call(callGetChartDataAPI, ticker);

    // order by date

    return yield put(updateChartState('tickerData', chartData));
}

function* watchGetChartData() {
    yield takeLatest(types.WATCH_GET_CHART_DATA, setGetChartData);
}

export default watchGetChartData;