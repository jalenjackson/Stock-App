import { Map, fromJS, List } from  'immutable';
import types from './types';

const initialState = fromJS({
    tickerData: Map({
        dates: List(),
        chartData: List()
    }),
    dates: List(),
    latestPrice: Map(),
    loadingChartData: false,
    loadingLatestPrice: false,
    latestPriceExceeded: false,
    chartDataExceeded: false,
    interval: '5min'
});

const ChartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_CHART_STATE: {
            const { key, value } = action.data;

            return state.merge({
               [key]: fromJS(value)
            });
        }
        default: {
            return state;
        }
    }
};

export default ChartReducer;

