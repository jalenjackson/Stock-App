import { combineReducers } from 'redux';
import search from '../components/Search/redux/search';
import chart from '../components/Chart/redux/chart';

export default combineReducers({
    search,
    chart
});