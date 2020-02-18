import { spawn, all } from 'redux-saga/effects';
import SearchSaga from '../components/Search/redux/sagas/search';
import GetChartData from '../components/Chart/redux/sagas/getChartData';
import GetLatestPrice from '../components/Chart/redux/sagas/getLatestPrice';

function* RootSaga() {
    yield all([
        spawn(SearchSaga),
        spawn(GetChartData),
        spawn(GetLatestPrice),
    ]);
}

export default RootSaga;