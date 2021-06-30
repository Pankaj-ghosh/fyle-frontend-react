import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from './header';
import BankApiContainer  from './bankapicontainer';
import favourites from './favourites'
import ShowBank from './showbank';
 
export const LandingPage = () => {
    return(
        <div className="bg-dark">
            <Router>
                <Header/>
                <Switch>
                    <Route exact path="/bank/:ifsc" component={ShowBank}></Route>
                    <Route exact path="/favourites" component={favourites} /> 
                    <Route exact path="/" component={BankApiContainer} />
                </Switch>
            </Router>
        </div>
    );
}