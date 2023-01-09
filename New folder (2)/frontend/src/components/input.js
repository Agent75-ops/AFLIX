import React, { useEffect, useState }  from "react";
import './input.css';
import isEmail from 'validator/es/lib/isEmail'
import {useNavigate} from 'react-router-dom'

function InputField(props){
    const [text, setText] = useState("");
    const navigate =useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        navigate("/register", {state: {text}})
    }
    return(
       <form onSubmit={handleSubmit}>
            { props.lab ==true ? <label id="elabel">Enter your email, and join the best comunity</label> : null}
            <div className="input-container">
                <input tpye="email" id="em" value={text} onChange={(e)=>{setText(e.target.value)}} required placeholder="Email"></input>
                <input type="submit" value="submit" id="sb"></input>
            </div>
        </form>
    )
}

export default InputField;