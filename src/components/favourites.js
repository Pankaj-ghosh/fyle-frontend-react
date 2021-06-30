import React from 'react' ;
import BankApiConatiner from './bankapicontainer';
import Table from './table';

export default () => {
    let favourites = JSON.parse(localStorage.getItem("favourites"));

    if (!favourites || favourites.length === 0) {
      return (
        <div
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div>
            <h2>No Favourites Available</h2>
          </div>
        </div>
      );
    }
    return (
        <div>
           <div>
               <Table 
                  showingFav = {true}
                  filteredbankdetails = {favourites}
               />
           </div>
        </div>
    );
};