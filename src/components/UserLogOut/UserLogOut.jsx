import React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import './UserLogOut.css'

export default function UserLogOut (props){
  return (
      <div className='d-flex '>
        <h5 className="text-justify">Hello {props.name}!</h5>
        <Button className="btn-sm" variant="dark" onClick={()=>{props.logoutUser()}} >Logout</Button>
      </div>
  );
}