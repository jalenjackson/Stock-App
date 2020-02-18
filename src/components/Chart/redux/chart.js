import { Map, fromJS } from  'immutable';
import types from './types';

const initialState = fromJS({
    tickerData: Map()
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

