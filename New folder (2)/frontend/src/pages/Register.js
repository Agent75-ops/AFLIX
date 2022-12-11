import React, { useEffect,useState} from 'react';
import { Button } from 'reactstrap';
import "./Register.css"
import formimg from "../photos/fi.jpg"
import { Link, useLocation } from "react-router-dom";
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie";

function Register(){
    let navigate = useNavigate()
    const {state}= useLocation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [passvalidation, setPassvalidation] = useState(false);
    const [cookies, setCookies] = useCookies(["token"]);
    
    useEffect(()=>{if(state !=null){
            setEmail(state.text);
            console.log("done")
        }},[])
    setCookies("toj","shit", {path: '/'})

    function verifyPass(pass, repass){
        if(pass !== repass){
            setPassvalidation(true)
            return false
        }
        else{
            setPassvalidation(false)
            return true
        }
    }
    function handleSubmit(e) {
        e.preventDefault();
        const user = {username , email,password}
        if (verifyPass(password,repassword)){
            fetch("http://127.0.0.1:8000/users/",{
                'method' : 'POST',
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization': ''
                },
                body: JSON.stringify(user)})
            .then((res)=>{
                console.log(res) 
                console.log(res.status , res.ok)
                if (res.status == 201 && res.ok == true){
                navigate("/movies", { replace: true })}
                return (res.json())})
            .then(res =>{
                console.log(res)
                // setCookies("token",res.token, {path: '/'})
                return res.user;
            })
            .catch((error)=>{console.log(error)})
        }
    }

    const inputNostate = {
        cursor: "pointer",
        border:"none",
        outline: "none",
        borderBottom : "none"
    }
    return(
        
        <div className='register-page'>
            <header>
                <Navbar />
            </header>
            <main>
                <div className='register-form-container'>
                    <div className="register-form-image" style={{backgroundImage:`linear-gradient(to bottom, rgb(255, 153, 0,0.1),rgb(255, 153, 0,0.5)),url(${formimg})`}} >
                    </div>
                    <div className='register-form-content'>
                        <h2>Sign up</h2>
                        <p>Create an account and enjoy what's left from your desperate life</p>
                        <form onSubmit={handleSubmit}>
                            <div className='register-form-div'>
                                <label>Username</label>
                                <input required type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
                            </div>
                            <div className='register-form-div'>
                                <label>Email</label>
                                {state == null ? <input required type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input> : <input required style={inputNostate} readOnly={true} type="email" value ={state.text}></input>}
                            </div>
                            <div className='register-form-div'>
                                <label>Password</label>
                                <input style={passvalidation ?{borderBottom:"2px solid red"}:null}  type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required></input>
                            </div>
                            <div className='register-form-div'>
                                <label>Confirm Password</label>
                                <input style={passvalidation ?{borderBottom:"2px solid red"}:null} type="password"  value={repassword} onChange={(e)=>{setRepassword(e.target.value)}} required></input>
                                <p style={passvalidation ?{visibility:"visible"}:null} >Passwords don't match !</p>
                            </div>
                            
                            <div className='register-form-div checkbox'>
                                <input type="checkbox"></input>
                                <label>Remember me</label>
                            </div>
                            <div className='register-form-div buttons'>
                                <Button style={{cursor: 'pointer',color:'white'}} type="submit"  id="signin" color="warning">Submit</Button>
                                <div><Link to={'/'}>Sign in<i id='arrow' className="fa-solid fa-arrow-right"></i></Link></div>
                            </div>    
                        </form>
                    </div>
                </div>
            </main>    
        </div>
    )
}

export default Register;