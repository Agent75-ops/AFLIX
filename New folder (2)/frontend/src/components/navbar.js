import React from "react";
import { Button } from "reactstrap";
import { Link} from "react-router-dom";
import btm from "../photos/1.png"
function Navbar(){
const navstyle = {
    color:"white"
};
    return(
        <nav>
            <img src={btm} alt="logo"/>
            <Link to="/login" style={navstyle}>
                <Button style={{cursor: 'pointer',color:'white'}}  id="signin" color="warning">Sign in</Button>
            </Link>
        </nav>
    )
}

export default Navbar;