import React, { Component } from 'react';
import Service from '../Services/service';
import BankFilter from './bankfilter';


class BankApiConatiner extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }


    loadBanks = (city, offSet, pageSize) => {
        Service.fetchBanks(city.value, offSet, pageSize)
        .then((bankdetails = []) => {
            if (bankdetails) {
            this.setState({
                bankdetails,
                filteredbankdetails: bankdetails
            });
            }
        })
    }

    changeBankDetails = (newBankDetails) => {
        let { bankdetails = [] } = this.state;
        if(newBankDetails){
            this.setState({filteredbankdetails: newBankDetails});
        } else {
            this.setState({filteredbankdetails: bankdetails})
        }
    }

    filterBanksByBranch = (city, offSet, pageSize, branch) => {
        let { bankdetails = [] } = this.state;
        if (branch) {
            Service.getBranchData(city.value, branch, offSet, pageSize)
            .then((bankdetails = []) => {
                if (bankdetails) {
                    this.setState({
                        bankdetails,
                        filteredbankdetails: bankdetails
                    });
                }
            })
        } else {
            this.setState({ filteredbankdetails: bankdetails });
        }

    }

    getFromLocalStorage(key) {
        let data = JSON.parse(localStorage.getItem(key));
        return data;
    }

    getFavourites = () => {
        let favourites = this.getFromLocalStorage("favourites");
        return favourites || [];
    };

    addToFavourites(key, bank) {
        let favourites = this.getFromLocalStorage("favourites") || [];
        favourites.push(bank);
        localStorage.setItem(key, JSON.stringify(favourites));
        return favourites;
    }

    removeFromFavourites (bank) {
        let favourites = this.getFromLocalStorage("favourites") || [];
        if (favourites && favourites.length > 0) {
          favourites.forEach((fav, index) => {
            if (fav.ifsc == bank.ifsc) {
              favourites.splice(index, 1);
            }
            favourites = [...favourites];
          });
          favourites.length > 0
            ? localStorage.setItem("favourites", JSON.stringify(favourites))
            : localStorage.clear();
          return favourites;
        }
    }

    toggleFavourite = (bank) => {
        let { favourites } = this.state;
        if (!favourites || favourites.map((fav) => {return fav.ifsc;}).indexOf(bank.ifsc) === -1) {
            this.addToFavourites("favourites", bank)
        }else {
            this.removeFromFavourites(bank)
        }
        this.setState({ favourites: this.getFavourites() });
    };

    searchBanks = (city, offSet, pageSize, key) => {
        Service.SearchBanks(city.value, offSet, pageSize, key)
        .then((bankdetails = []) => {
            if (bankdetails) {
            this.setState({
                bankdetails,
                filteredbankdetails: bankdetails
            });
            }
        })
    }

    
    render() {
        return (
            <div>
                <BankFilter 
                    filteredbankdetails = {this.state.filteredbankdetails}
                    bankdetails = {this.state.bankdetails || []}
                    loadBanks = {this.loadBanks}
                    changeBankDetails = {this.changeBankDetails}
                    getTotalBanks = {this.getTotalBanks}
                    toggleFavourite = {this.toggleFavourite}
                    getFavourites = {this.getFavourites}
                    filterBanksByBranch = {this.filterBanksByBranch}
                    searchBanks = {this.searchBanks}
                />
            </div>
        );
    }
}

export default BankApiConatiner;
