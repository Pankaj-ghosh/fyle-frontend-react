import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import Service from '../Services/service'

class BranchSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branch : " "
        };
      }


    onBranchChange = (option) => {
        let { city, offSet, pageSize } = this.props;
        if (option){
             this.props.filterBanksByBranch(city, offSet, pageSize , option.value);
            this.setState({ branch: option ? option : null });
        }
    };

    loadBranchOptions = (branch, callback) => {
        let { city, offSet, pageSize } = this.props;
        Service.getBranches(city.value, branch, offSet, pageSize).then(
        (options) => {
            callback(
                options.map((option) => {
                    return { label: option.branch, value: option.branch };
                })
            );
        }
        );
    };
    

    render() {
        return(
            <React.Fragment>
                <div className="mb-1 text-light" style={{ fontWeight: 500, fontSize: "14px" }}>
                    Select Branch
                </div>

                <AsyncSelect
                    placeholder="Type to search"
                    loadOptions={this.loadBranchOptions}
                    value={this.state.branch}
                    onChange={this.onBranchChange}
                />

            </React.Fragment>
        );
    }
}

export default BranchSelector;