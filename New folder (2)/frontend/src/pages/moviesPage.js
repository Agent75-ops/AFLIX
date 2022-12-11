import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
function MoviesPage(){
    // useEffect(()=>{
    //     cookies.token
    // },[])
    useEffect(
        
        () => {
        const [cookies, setCookies] = useCookies(["token"]);
        console.log(cookies["token"])
        
        }
        
        ,[])
    
   

    return(
        <div>
            console.log(fi)
        </div>
    )
}
export default MoviesPage;