import React, { Component } from 'react';
import Select from "react-select";
import AdjustPageSize from './adjustpagesize';
import SearchBox from './serachbox';
import Table  from './table';
import ReactPaginate from 'react-paginate'
import Service from '../Services/service';
import BranchSelector from './branchselector';

const cities = [
    { label: "Banglore", value: "Banglore" },
    { label: "Mumbai", value: "Mumbai" },
    { label: "Chennai", value: "Chennai" },
    { label: "Kolkata", value: "Kolkata" },
    { label: "Delhi", value: "Delhi" },
];

class BankFilter extends Component{
    constructor(props){
        super(props);
        this.state={
            city: { label: "Delhi", value: "Delhi"},
            currentPage: 1,
            pageSize: 10,
            totalBanks: 0,
            offSet:  0
        }
    }

    componentDidMount() {
        let {city} = this.state;
        this.getTotalBanks(city.value);
        this.loadBanks();
    }


    getTotalBanks = (city) => {
        Service.getBankCount(city)
        .then((totalBanks) => {
            if(totalBanks)
                this.setState({pageCount:(Math.ceil(totalBanks/this.state.pageSize)) })
        })
    }
    

    changeCity = (city) => {
        this.setState({ city: city, offSet : 0, currentPage : 0 }, () => {
            this.loadBanks();
            this.getTotalBanks(city.value);
        })
    };

    loadBanks = () => {
        let { city, offSet, pageSize } = this.state;
        this.props.loadBanks(city, offSet, pageSize);
    };

    changePageSize = (newPageSize) => {
        let {pageSize, currentPage, offSet} = this.state;
        offSet = (currentPage - 1) * pageSize;
        this.setState({pageSize: newPageSize, offSet}, this.loadBanks);
    };

    handlePageClick = (pageNumber) => {
        let { city, pageSize, offSet } = this.state;
        let currentPage = pageNumber.selected+1;
        offSet = (currentPage - 1) * pageSize;
        this.props.loadBanks(city, offSet , pageSize);
        this.setState({currentPage, offSet});
    }

    render() {
        let favourites = this.props.getFavourites();
        return(
            <div>
                <div className="col-md-12 mt-3 pb-3">
                    <div className="d-flex justify-content-between sidebar sidebar--style-4 z-depth-1-top bg-dark" style={{ width:"100%", justifyContent: "space-evenly"}}>
                        <div style = {{ width : "200px"}}> 
                            <div className="mb-1 text-light" style={{ fontWeight: 500, fontSize: "14px" }}>
                                Select City
                            </div>
                            <Select
                                placeholder="Select City"
                                options={cities}
                                onChange={this.changeCity}
                                value={ this.state.city }
                            />
                        </div>
                        <div style = {{ width : "200px"}}>
                            <SearchBox 
                                side = "client"
                                loadBanks = {this.props.loadBanks}
                                bankdetails = {this.props.bankdetails}
                                filteredbankdetails = {this.props.filteredbankdetails} 
                                changeBankDetails = {this.props.changeBankDetails}
                            />
                        </div>
                        <div style = {{ width : "200px"}}>
                            <SearchBox 
                                side = "server"
                                searchBanks = {this.props.searchBanks}
                                city = {this.state.city}
                                offSet = {this.state.offSet}
                                pageSize = {this.state.pageSize}
                                changeBankDetails = {this.props.changeBankDetails}
                            />
                        </div>
                        <div style = {{ width : "200px"}}>
                            <BranchSelector
                                city = {this.state.city}
                                offSet = {this.state.offSet}
                                pageSize = {this.state.pageSize}
                                filterBanksByBranch = {this.props.filterBanksByBranch}
                            />
                        </div>
                    </div>
                </div>
                {(this.props.filteredbankdetails && this.props.filteredbankdetails.length>=1) ? 
                    <div>
                        <div>
                            <Table 
                                showingFav = {false}
                                city = {this.state.city}
                                currentPage = {this.state.currentPage}
                                pageSize = {this.state.pageSize}
                                loadBanks = {this.props.loadBanks}
                                filteredbankdetails = {this.props.filteredbankdetails}
                                offSet = {this.state.offSet} 
                                toggleFavourite = {this.props.toggleFavourite}
                                favourites = {favourites}
                            />
                        </div>
                        <div className="d-flex mt-5" style={{ justifyContent: "space-evenly" }}>
                            <div className="text-light">
                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={2}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    activeClassName={"paginationActive"}/>
                            </div>
                            <div className="ml-5 bg-dark" style={{ width:"10%" }}>
                                <AdjustPageSize 
                                    pageSize = {this.state.pageSize}
                                    changePageSize = {this.changePageSize}
                                />
                            </div>
                        </div>
                    </div>
                :
                (
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="card" style={{padding: 15, marginTop: 20}}>
                            <h5>Bank Data Unavailable</h5>
                        </div>
                    </div>
                )
                }
            </div>
        );
    }

}

export default BankFilter;