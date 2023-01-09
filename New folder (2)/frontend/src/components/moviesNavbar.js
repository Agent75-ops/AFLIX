import React from "react";
import { Link } from "react-router-dom";
import {Button} from "reactstrap"
import styled from 'styled-components'
import { useCookies } from "react-cookie";
import './moviesNavbar.css'

const navstyle = {
    color:"white",
    marginTop:"1rem"
};

const Logo = styled.h1`
font-family: 'Kanit', sans-serif;
color:orange;
font-weight:700;
font-size:2.3rem;
margin:0 0 0 0;
`

function MoviesNav(props){
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    return(
    <nav className="moviesPageNavTag">
        <ul>
            <li><Logo>AFLIX</Logo></li>
            <li><Link>Home</Link></li>
            <li>
                <Link id="genre">Genre</Link>
                <div className="drop-down-genres">
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <Link>Action</Link>
                    <Link>Adventure</Link>
                    <Link>Crime</Link>
                    <div id="genre1"></div>
                </div>
            </li>
            <li><Link>Movies</Link></li>
            <li><Link>Top IMDB</Link></li>
        </ul>
        <div className="movies-navbar">
            <div className="search">
                <input className="searchInput" type="text" placeholder="search"></input>
                <i className="fa-solid fa-magnifying-glass"></i>        
            </div>
            <div>
                {cookies.token ?
                <div>
                    <Button  style={{cursor: 'pointer',color:'white',borderRadius:"2px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}} id="signedin" color="warning">
                        {cookies.token[1]} <i className="fa-sharp fa-solid fa-caret-down"></i>
                    </Button>
                </div>
                : <Link to="/login" style={navstyle}>
                    <Button style={{cursor: 'pointer',color:'white',borderRadius:"2px"}}  id="signin" color="warning">Sign In</Button>
                </Link> 
            
                }
                
            </div>
        </div>   
    </nav>
    

    )
}

export default MoviesNav;