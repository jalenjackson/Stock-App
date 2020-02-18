import { Map, fromJS, List } from 'immutable';
import types from './types';

const initialState = Map({
    searchTerm: '',
    searchResults: List(),
    selectedTicker: 'SPCE'
});

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_SEARCH_INTERNAL_STATE: {
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

export default SearchReducer;