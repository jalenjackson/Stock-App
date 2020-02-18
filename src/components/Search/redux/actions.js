import types from './types';

export const updateSearchState = (key, value) => ({
    type: types.UPDATE_SEARCH_INTERNAL_STATE,
    data: { key, value }
});

export const searchStock = term => ({
    type: types.WATCH_SEARCH_TICKER_DATA,
    term
});