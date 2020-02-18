import { takeLatest, call, put } from 'redux-saga/effects';
import { UriHelper } from'../../../../utils/UriHelper';
import { updateChartState } from '../actions';
import axios from 'axios';
import types from '../types';
import _ from 'lodash';

function* callGetChartDataAPI(ticker, interval, apiOptions) {
    const options = {
        url: `${UriHelper(apiOptions.method)}&symbol=${ticker}`,
        method: 'get'
    };

    if (apiOptions.interval) {
        options.url += `&interval=${apiOptions.interval}`
    }

    if (apiOptions.outputSizeFull) {
        options.url += `&outputsize=full`;
    }

    try {
        const response = yield axios.request(options);

        if (_.get(response, 'data.Note')) {
            return 'exceeded';
        } else {
            return _.get(response, `data.${apiOptions.target}`);
        }
    } catch (e) {
        return {};
    }
}

function* setGetChartData({ data }) {
    yield put(updateChartState('loadingChartData', true));
    yield put(updateChartState('chartDataExceeded', false));

    const { ticker, interval } = data;

    let apiOptions = { method: 'TIME_SERIES_INTRADAY', interval: '5min', outputSizeFull: false, size: false, target: 'Time Series (5min)' };

    switch (interval) {
        case '5min': break;
        case '1W': {
            apiOptions = { method: 'TIME_SERIES_INTRADAY', interval: '60min', outputSizeFull: true, size: 49, target: 'Time Series (60min)' };
            break;
        }
        case '1M': {
            apiOptions = { method: 'TIME_SERIES_DAILY', interval: false, outputSizeFull: true, size: 22, target: 'Time Series (Daily)' };
            break;
        }
        case '1Y': {
            apiOptions = { method: 'TIME_SERIES_DAILY', interval: false, outputSizeFull: true, size: 253, target: 'Time Series (Daily)' };
            break;
        }
        default: break;
    }

    const chartData = yield call(callGetChartDataAPI, ticker, interval, apiOptions);

    if (chartData === 'exceeded') {
        yield put(updateChartState('chartDataExceeded', true));
        return;
    } else {
        yield put(updateChartState('chartDataExceeded', false));
    }

    let allChartData = {
        chartData: [],
        dates: []
    };

    for (let chartDataKey in chartData) {
        let chartObj = chartData[chartDataKey];

        allChartData.dates.push(chartDataKey);

        allChartData.chartData.push(
            [chartObj['1. open'],
            chartObj['4. close'],
            chartObj['3. low'],
            chartObj['2. high']],
        );
    }

    allChartData.dates = allChartData.dates.reverse();
    allChartData.chartData = allChartData.chartData.reverse();

    if (apiOptions.size) {
        allChartData.chartData = allChartData.chartData.slice(allChartData.chartData.length - apiOptions.size);
        allChartData.dates = allChartData.dates.slice(allChartData.dates.length - apiOptions.size);
    }

    yield put(updateChartState('loadingChartData', false));
    yield put(updateChartState('dates', allChartData.dates));
    return yield put(updateChartState('tickerData', allChartData));
}

function* watchGetChartData() {
    yield takeLatest(types.WATCH_GET_CHART_DATA, setGetChartData);
}

export default watchGetChartData;