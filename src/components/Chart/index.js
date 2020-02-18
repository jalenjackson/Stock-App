import React, {useEffect} from 'react';
import ReactEchartsCore from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/candlestick'
import { connect } from 'react-redux';
import { getChartData } from './redux/actions';

echarts.registerTheme('my_theme', {
    backgroundColor: '#f4cccc'
});

function Chart(props) {

    useEffect(() => {
        props.getChartData(props.selectedTicker);
    }, []);

    if (!props.tickerData || Object.keys(props.tickerData).length === 0) {
        return (
            <div>loading...</div>
        )
    }
    function onChartReadyCallback(e) {
        console.log(e);
    }

    function onChartClick() {
        console.log('chart clicked')
    }

    function onChartLegendselectchanged() {
        console.log('chart legend changed')
    }


    function calculateMA(dayCount, data) {
        var result = [];

        for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    let data = [];
    let dates = [];

    function handleData() {
        const tickerData = props.tickerData;

        for (let tickerKey in tickerData) {
            dates.push(tickerKey);

            data.push([
                tickerData[tickerKey]['1. open'],
                tickerData[tickerKey]['4. close'],
                tickerData[tickerKey]['3. low'],
                tickerData[tickerKey]['2. high']
            ]);
        }

        return data;
    }

    handleData();

    function getOption() {
        return {
            backgroundColor: '#21202D',
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
                inactiveColor: '#777',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLine: { lineStyle: { color: '#8392A5' } }
            },
            yAxis: {
                scale: true,
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitLine: { show: false }
            },
            grid: {
                bottom: 80
            },
            dataZoom: [{
                textStyle: {
                    color: '#8392A5'
                },
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                dataBackground: {
                    areaStyle: {
                        color: '#8392A5'
                    },
                    lineStyle: {
                        opacity: 0.8,
                        color: '#8392A5'
                    }
                },
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }, {
                type: 'inside'
            }],
            animation: false,
            series: [
                {
                    type: 'candlestick',
                    name: '日K',
                    data: data,
                    itemStyle: {
                        color: '#FD1050',
                        color0: '#0CF49B',
                        borderColor: '#FD1050',
                        borderColor0: '#0CF49B'
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MA30',
                    type: 'line',
                    data: calculateMA(30, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                }
            ]
        };
    }

    let onEvents = {
        click: onChartClick,
        legendselectchanged: onChartLegendselectchanged
    };

    console.log('ticker data', props.tickerData);

    return (
        <div>
            <ReactEchartsCore
                echarts={echarts}
                option={getOption()}
                notMerge={true}
                lazyUpdate={true}
                onChartReady={onChartReadyCallback}
                theme='my_theme'
                onEvents={onEvents} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        selectedTicker: state.search.get('selectedTicker'),
        tickerData: state.chart.get('tickerData').toJS()
    }
};

export default connect(mapStateToProps, { getChartData })(Chart);