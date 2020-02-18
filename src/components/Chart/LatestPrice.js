import React from 'react';
import Button from "antd/lib/button";
import { tryFetchingLatestPriceAgain } from './methods';

function LatestPrice(props) {
    if (props.loadingLatestPrice) {
        return (
            <div className='latest-price-wrapper'>
                <h1>-</h1>
                <h2>-</h2>
            </div>
        )
    }

    if (props.latestPriceExceeded) {
        return (
            <div className='latest-price-wrapper'>
                <h1>Failed to get price. (only 5 api calls a minute)</h1>
                <Button type='primary' onClick={() => tryFetchingLatestPriceAgain(props)}>Try again</Button>
            </div>
        )
    }

    if (props.latestPrice && Object.keys(props.latestPrice).length > 0) {
        return (
            <div className='latest-price-wrapper'>
                <h1>${props.latestPrice.price}</h1>
                <h2 className={props.latestPrice.change > 0 ? 'latest-price-change-color-green' : 'latest-price-change-color-red'}>{`${props.latestPrice.change > 0 ? '+' : '-'}$${String(Math.round(props.latestPrice.change * 100) / 100).substring(1)}`}</h2>
            </div>
        )
    } else {
        return (
            <div className={'latest-price-wrapper'}>
                <h1>-</h1>
                <h1>-</h1>
            </div>
        )
    }
}

export default LatestPrice;