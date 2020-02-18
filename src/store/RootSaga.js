import { spawn, all } from 'redux-saga/effects';
import SearchSaga from '../components/Search/redux/sagas/search';
import GetChartData from '../components/Chart/redux/sagas/getChartData';

function* RootSaga() {
    yield all([
        spawn(SearchSaga),
        spawn(GetChartData),
    ]);
}

export default RootSaga;