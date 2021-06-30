import React, { Component } from 'react';
import { TableHeader } from './table-header';
import DisplayDetails from './display-details';


class Table extends Component{
    constructor(props){
        super(props);
    }
   
    render() {
        return(
            <div>
                <table className="table table-lg table-dark table-hover">
                    <thead>
                        <TableHeader
                            showingFav = {this.props.showingFav}
                        />
                    </thead>
                    <tbody>
                        <DisplayDetails
                            showingFav = {this.props.showingFav} 
                            filteredbankdetails = {this.props.filteredbankdetails} 
                            city = {this.props.city}
                            currentPage = {this.props.currentPage}
                            pageSize = {this.props.pageSize}
                            offSet = {this.props.offSet}
                            toggleFavourite = {this.props.toggleFavourite}
                            favourites = {this.props.favourites}
                        />
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;