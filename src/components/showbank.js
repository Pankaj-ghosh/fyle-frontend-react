import React from 'react' ;
import Service from '../Services/service';

class ShowBank extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
        let ifsc = this.props.match.params.ifsc;
        Service.getBank(ifsc)
            .then((response) => {
                if (response.success) {
                this.setState({ bankdetail: response.bankdetail[0]});
                } else {
                this.setState({ message: response.message});
                }
            })
    }


    render(){
        let { bankdetail , message = null } = this.state;

        if (message) {
            return (
                <div
                    style={{ height: "100vh" }}
                    className="card d-flex justify-content-center align-items-center"
                >
                    <h2>{message}</h2>
                </div>
            );
          }
      
        if (!bankdetail) {
            return null;
        }

        return (
            <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
                <div className="card .z-depth-1-top">
                <div>
                        <span className="strong-500">Bank name : </span> {bankdetail.bank_name}
                </div>
                <div>
                    <span className="strong-500">Branch :</span> {bankdetail.branch}
                </div>
                <div>
                    <span className="strong-500">Address :</span> {bankdetail.address}
                </div>
                <div>
                    <span className="strong-500">City :</span> {bankdetail.city}
                </div>
                <div>
                    <span className="strong-500">District :</span> {bankdetail.district}
                </div>
                <div>
                    <span className="strong-500">State :</span> {bankdetail.state}
                </div>
                <div>
                    <span className="strong-500"> IFSC :</span> {bankdetail.ifsc}
                </div>
                </div>
            </div>
        )
    }
}

export default ShowBank;