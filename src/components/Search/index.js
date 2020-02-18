import React from 'react';
import Autocomplete from 'antd/lib/auto-complete';
import Input from 'antd/lib/input';
import Icon from 'antd/lib/icon';
import { formatMessage } from '../../utils/formatMessage';
import { updateSearchState, searchStock } from './redux/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const { Option } = Autocomplete;

function Search(props) {
    const options = props.searchResults
        .map(result => (
            <Option key={result['1. symbol']} value={result['1. symbol']}>
                <span>{result['1. symbol']}</span>
                <span className="stock-search-name">{result['2. name']}</span>
            </Option>

        ));

    function handleSearch(term) {
        props.searchStock(term);
    }

    function handleSelect(selection) {
        props.history.push(`/stocks/${selection}`);
    }

    return (
        <div className='stock-search-container'>
            <Autocomplete
                className='stock-search'
                dropdownClassName='stock-search-dropdown'
                dropdownMatchSelectWidth={false}
                onSearch={handleSearch}
                onSelect={handleSelect}
                size='large'
                style={{ width: '100%' }}
                dataSource={options}
                placeholder={formatMessage({ id: 'app.search-for-a-stock' })}
                optionLabelProp='value'>
                    <Input placeholder='Search For A Stock eg. Microsoft' suffix={<Icon style={{ color: '#35C59B' }} type='search' className='stock-search-icon' />} />
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

export default withRouter(connect(mapStateToProps, { updateSearchState, searchStock })(Search));