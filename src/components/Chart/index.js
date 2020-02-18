import React, {useEffect} from 'react';
import ReactEchartsCore from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick'
import { connect } from 'react-redux';
import { getChartData, getLatestPrice, updateChartState } from './redux/actions';
import { getOption, tryFetchingChartAgain, getLoadingOption, changeInterval } from './methods';
import Button from 'antd/lib/button';
import LatestPrice from "./LatestPrice";

echarts.registerTheme('my_theme', {
    backgroundColor: '#f4cccc'
});

function Chart(props) {
    useEffect(() => {
        props.getChartData(props.ticker, '5min', true, props.tickerData);
        props.getLatestPrice(props.ticker);

        const interval = setInterval(() => {
            props.getLatestPrice(props.ticker);
        }, 20000);

        return () => {
            clearInterval(interval);
        };
    }, [props.ticker]);

    return (
        <div>
            <h1 className='ticker'>{ props.ticker.toUpperCase() }</h1>
            <LatestPrice {...props} />
            <div style={{ height: '50vh' }} className='chart-wrapper'>
                <ReactEchartsCore
                    echarts={echarts}
                    option={getOption(props)}
                    notMerge={true}
                    lazyUpdate={true}
                    theme='my_theme'
                    style={{ minHeight: '100%' }}
                    loadingOption={getLoadingOption()}
                    showLoading={props.loadingChartData}/>
                    { props.chartDataExceeded
                        ?   <div className='chart-container'>
                                <div className='chart-overlay'>
                                    <h1>Couldn't render chart. Only 5 API calls a minute max.</h1>
                                    <Button className='try-fetching-chart-btn' type='primary' onClick={() => tryFetchingChartAgain(props)}>Try Again</Button>
                                </div>
                            </div>
                        : null
                    }
            </div>
            <div className='interval-wrapper'>
                <a className={props.interval === '5min' ? 'interval-chosen' : ''}  onClick={() => changeInterval(props, '5min')}>5min</a>
                <a className={props.interval === '1W' ? 'interval-chosen' : ''} onClick={() => changeInterval(props, '1W')}>1W</a>
                <a className={props.interval === '1M' ? 'interval-chosen' : ''} onClick={() => changeInterval(props, '1M')}>1M</a>
                <a className={props.interval === '1Y' ? 'interval-chosen' : ''} onClick={() => changeInterval(props, '1Y')}>1Y</a>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tickerData: state.chart.get('tickerData').toJS(),
        latestPrice: state.chart.get('latestPrice').toJS(),
        loadingChartData: state.chart.get('loadingChartData'),
        latestPriceExceeded: state.chart.get('latestPriceExceeded'),
        chartDataExceeded: state.chart.get('chartDataExceeded'),
        dates: state.chart.get('dates').toJS(),
        interval: state.chart.get('interval')
    }
};

export default connect(mapStateToProps, { getChartData, getLatestPrice, updateChartState })(Chart);