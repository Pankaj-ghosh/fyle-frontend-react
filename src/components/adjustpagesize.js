import React, { Component } from 'react';
import Select from 'react-select';

const pageSizes = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 50, value: 50 },
    { label: 100, value: 100 }
  ];

class AdjustPageSize extends Component {
    constructor(props){
        super(props);
        this.state={
            pageSize: { label : '10', value: '10'}
        }
    }

    changePageSize = (newPageSize) => {
        this.props.changePageSize(newPageSize.value)
        this.setState({pageSize: newPageSize});
    }

    render() {
        return(
            <div>
                <Select
                    value = {this.state.pageSize}
                    options = {pageSizes}
                    onChange = {this.changePageSize}
                />
            </div>
        )
    }
}

export default AdjustPageSize;