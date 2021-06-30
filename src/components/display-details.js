import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import showbank from './showbank';

class DisplayDetails extends Component {
    constructor(props) {
        super(props);
            this.state= {
            
            }
    }

    render() {
        let {filteredbankdetails = [], favourites, showingFav} = this.props;
        return (
            <React.Fragment>
                {filteredbankdetails.map ( bankdetail => (
                    <tr>  
                        <td>{bankdetail.ifsc}</td>
                        <td className="bg-dark">
                            <Link style={{ textDecoration: "none" }} to={"/bank/" + bankdetail.ifsc}>
                                {bankdetail.bank_name}
                            </Link>
                        </td>
                        {/* <td>{bankdetail.bank_name}</td> */}
                        <td>{bankdetail.bank_id}</td>
                        <td>{bankdetail.branch}</td>
                        <td>{bankdetail.address}</td>
                        <td>{bankdetail.city}</td>
                        <td>{bankdetail.district}</td>
                        <td>{bankdetail.state}</td>
                        {!showingFav &&
                            <td 
                                className={favourites &&favourites.map((fav) => {return fav.ifsc;}).indexOf(bankdetail.ifsc) !== -1 ? "fav": "non-fav"}
                                onClick={() => this.props.toggleFavourite(bankdetail)}
                            >
                                <i className="fa fa-heart" />
                            </td>                       
                        }
                    </tr>
                ))}     
            </React.Fragment>
        ); 
    }

}

export default DisplayDetails;