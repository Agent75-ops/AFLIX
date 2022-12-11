import React from "react";
import Navbar from "../components/navbar"
import "./login.css"
import btm from "../photos/1.png"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import SmBtn from "../components/SmBtn";



function LoginPage(){
    
    const Input = styled.input`
    width:80%;
    border-radius:5px;
    margin:1rem 0;
    height:45px;
    border :none;
    outline:none;
    `
    return(
        <div className="login-page">
            <div className="login-page-container">
                <header>
                    <nav>
                        <img src={btm} alt="logo"/>
                    </nav>
                </header>
                <main>
                    <div className="login-form-container">
                        <h2>Sign In</h2>
                        <form className="login-form">
                            <div>
                                
                                <Input type="email" placeholder="Email"/>
                            </div>
                            <div>
                                
                                <Input type="password" placeholder="Password"/>
                            </div>
                            <div  id="login-forgot-password-div">
                                <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                            </div>
                            <div className="sign-in-btn-div">
                                <Button style={{width:"80%", backgroundColor:"orange", border:"none"}}>Sign in</Button>
                            </div>
                            <p>Or login with</p>
                            <div className="social-media-logos">
                                <SmBtn small={false} color="blue" icon="facebook" media="facebook" />
                                <SmBtn small={false} color="#1DA1F2" icon="twitter" media="twitter" />
                                <SmBtn small={false} color="#ac2bac" icon="instagram" media="instagram" />
                            </div>
                            <div>
                                <p style={{marginRight:'5px'}}>Don't have an account?</p>
                                <Link to="/register">Sign up !</Link>
                            </div>
                        </form>
                    </div>
                </main>
        
                
            </div>
        </div>
    )

}

export default LoginPage;