import React  from 'react';
import Chart from '../../components/Chart';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

function StockShow(props) {
    console.log(_.get(props, 'match.params.stock'));

    return (
        <div>
            <Chart ticker={_.get(props, 'match.params.stock')} />
        </div>
    )
}

export default withRouter(StockShow);