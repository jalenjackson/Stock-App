import types from './types';

export const updateChartState = (key, value) => ({
    type: types.UPDATE_CHART_STATE,
    data: { key, value }
});

export const getChartData = (ticker, interval, showNotification, tickerData) => ({
    type: types.WATCH_GET_CHART_DATA,
    data: { ticker, interval, showNotification, tickerData }
});

export const getLatestPrice = ticker => ({
    type: types.WATCH_GET_LATEST_PRICE,
    ticker
});

