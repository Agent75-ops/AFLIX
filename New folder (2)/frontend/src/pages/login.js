import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css"
import btm from "../photos/1.png"
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import SmBtn from "../components/SmBtn";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FacebookLogin from "react-facebook-login"

    const Logo = styled.h1`
    font-family: 'Kanit', sans-serif;
    font-family: 'Open Sans', sans-serif;
    color:orange;
    font-weight:700;
    margin-left:2rem;
    margin-top :7px;
    `
    const Parag = styled.p`
    color: Red;
    margin:0 0 0 2.5rem;
    align-self: start;
    transform:translateY(-2px);
    `
    const Input = styled.input`
    width:80%;
    border-radius:5px;
    margin:1rem 0;
    height:45px;
    border :none;
    outline:none;
    `

function LoginPage(){
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const[response, setResponse] = useState(302)
    const [cookies,setCookies,removeCookie] = useCookies(["token"])
    useEffect(()=>{
        if(cookies.token){
            navigate('/movies',{replace:true})
        }
    },[])
    function handleSubmit(e){
        e.preventDefault()
        const user = {email,password}
        fetch("http://127.0.0.1:8000/login/",{
            method:"POST",
            body:JSON.stringify(user),
            headers :{
                'Content-Type': 'application/json',
                'Authorization': ''
            },
        })
        .then((resp)=>{
            console.log(resp.status)
            setResponse(resp.status)
            return resp.json()})
        .then(resp=>{
            console.log(resp)
            setCookies("token", [resp.token, resp.user.username,resp.user.password], {path :"/"})
            return resp}).then((resp) =>{
                if (resp.user && resp.token){
                navigate('/movies')}
                else{
                    console.log("fuck")

                }
            }
            )
        .catch(error =>{ console.error(error)})
    }
 
    const responseFacebook =(response)=>{
        console.log(response)
    }
    return(
        <div className="login-page">
            <div className="login-page-container">
                <header>
                    <nav style={{height:"70px", display:"flex",alignItems:"center"}}>
                        <Logo>AFLIX</Logo>
                    </nav>
                </header>
                <main>
                    <div className="login-form-container">
                        <h2>Sign In</h2>
                        <form onSubmit={handleSubmit} className="login-form">
                            <div>
                                <Input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email"/>
                            </div>
                            <div>        
                                <Input onChange={(e)=>{setPass(e.target.value)}} type="password" placeholder="Password"/>
                            </div>
                            { response != 302 ?<Parag>Wrong email or password ! </Parag>:null}
                            <div  id="login-forgot-password-div">
                                <Link id="login-forgot-password" to="#">Forgot password ?</Link>
                            </div>
                            <div className="sign-in-btn-div">
                                <Button style={{width:"80%", backgroundColor:"orange", border:"none"}}>Sign in</Button>
                            </div>
                            <p>Or login with</p>
                            <div className="social-media-logos">
                                {/* <SmBtn small={false} color="blue" icon="facebook" media="facebook" /> */}
                                <FacebookLogin 
                                    appId="1088597931155576"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    onClick={()=>{console.log("click")}}
                                    callback={responseFacebook}
                                />
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