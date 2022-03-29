import React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import './UserLogOut.css'

export default function UserLogOut (props){
  return (
      <div className='UserLogOut'>
        {/* <div>Name: {props.name}</div>
        <div>Email: {props.email}</div> */}
        <Button className="btn-sm" variant="dark" onClick={()=>{props.logoutUser()}} >Logout</Button>
      </div>
  );
}