import React, { Component } from 'react';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField : ''
        }
    }
    
    componentDidMount() {
        
    }

    OnClientSearch = (e) => {
        let searchField = e.target.value;
        if(this.props.bankdetails){
            let filteredBanks = this.props.bankdetails.filter(bankdetail => (
                (bankdetail.ifsc ? bankdetail.ifsc.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.bank_name ? bankdetail.bank_name.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.bank_id ? bankdetail.bank_id.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.city ? bankdetail.city.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.branch ? bankdetail.branch.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.address ? bankdetail.address.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.district ? bankdetail.district.toLowerCase().includes(searchField.toLowerCase()) : null) ||
                (bankdetail.state ? bankdetail.state.toLowerCase().includes(searchField.toLowerCase()) : null)))
                
            this.props.changeBankDetails(filteredBanks);
        }
    };

    onServerSearch = (e) => {
        let {city, offSet, pageSize} = this.props
        let searchField = e.target.value;
        this.props.searchBanks(city, offSet, pageSize, searchField)
    }

    render() {
        let {side} = this.props
        return (
            <React.Fragment>
                 <div className="mb-1 text-light" style={{ fontWeight: 500, fontSize: "14px" }}>
                    {side === "client" ? "Client Side Search" : "Server Side Search"}
                </div>
                <input
                    style = {{height : "38px", borderRadius: "4px"}}
                    type='search'
                    placeholder=' Type to search'
                    onChange={side === "client" ? this.OnClientSearch : this.onServerSearch}
                />
            </React.Fragment>
        );
    }
}

export default SearchBox;