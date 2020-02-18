import React from 'react';
import Autocomplete from 'antd/lib/auto-complete';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { formatMessage } from '../../utils/formatMessage';
import { updateSearchState, searchStock } from './redux/actions';
import { connect } from 'react-redux';

const { Option, OptGroup } = Autocomplete;

function Search(props) {
    const options = props.searchResults
        .map(result => (
            <Option key={result['1. symbol']} value={result['1. symbol']}>
                {result['1. symbol']}
                <span className="stock-search-name">{result['2. name']}</span>
            </Option>

        ))
        .concat([
            <Option disabled key="all" className="show-all">
                <a href="https://www.google.com/search?q=antd" target="_blank" rel="noopener noreferrer">
                    View all results
                </a>
            </Option>,
        ]);

    function handleSearch(term) {
        props.searchStock(term);
    }

    console.log(props);

    return (
        <div>
            <Autocomplete
                className='stock-search'
                dropdownClassName='stock-search-dropdown'
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                onSearch={handleSearch}
                size='large'
                style={{ width: '100%' }}
                dataSource={options}
                placeholder={formatMessage({ id: 'app.search-for-a-stock' })}
                optionLabelProp='value'>
                    <Input suffix={<Icon type='search' className='stock-search-icon' />} />
            </Autocomplete>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        searchTerm: state.search.get('searchTerm'),
        searchResults: state.search.get('searchResults').toJS()
    }
};

export default connect(mapStateToProps, { updateSearchState, searchStock })(Search);