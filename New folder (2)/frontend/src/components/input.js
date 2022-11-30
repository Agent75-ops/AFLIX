import React  from "react";
import './input.css'
function InputField(){
    return(
        <div className="input-container">
                <input tpye="email" id="em" required placeholder="Email"></input>
                <input type="submit" id="sb" value="Join Us >"></input>
        </div>
    )
}

export default InputField;