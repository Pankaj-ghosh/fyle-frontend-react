import React from 'react';
import { NavLink } from "react-router-dom";

export const Header = () => {
    return(
        <nav
            style={{ justifyContent: "space-evenly" }}
            className="navbar d-flex navbar-expand-sm bg-dark "
        >
        <NavLink to="/">
          <a className="navbar-brand text-white"><h2>Bank Branches</h2></a>
        </NavLink>
        <NavLink style={{ textDecoration: "underline white" }} to="/favourites">
          <span className="text-white" style={{ alignItems: "center", justifyContent: "space-between" }}> 
            <h4>Favourites<i className="ml-2 fa fa-heart" /></h4> 
            
          </span>
        </NavLink>
      </nav>
    );
}