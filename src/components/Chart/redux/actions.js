import types from './types';

export const updateChartState = (key, value) => ({
    type: types.UPDATE_CHART_STATE,
    data: { key, value }
});

export const getChartData = ticker => ({
    type: types.WATCH_GET_CHART_DATA,
    ticker
});

