import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { json, useNavigate } from "react-router-dom";
import MoviesNav from "../components/moviesNavbar";
import "./moviesPage.css"
import Crousel from "../components/carousel";
import SmBtn from "../components/SmBtn";
import MovieCard from "../components/Moviecard";
import Category from "../components/Category"
import {TrendingMovies} from "../components/TrendingMovies"
import LatestMovies from "../components/LatestMovies"
import UpcomingMovies from "../components/UpcomingMovies";
function MoviesPage(){
    const [cookies , setCookies, removeCookie] = useCookies(["token"])
    const navigate = useNavigate()
    const[dataState, setData]= useState([])
    useEffect(()=>{
            async function fetchData(){
                let apidata =  await fetch("http://127.0.0.1:8000/api/");
                if(apidata.ok == true && apidata.status == 200){
                    let response = await apidata.json()
                    setData(response)                   
                }
            }
            fetchData()
        },[])
        
    useEffect(
        () => {
            if (cookies.token==null){
                navigate('/login', {replace:true})
            }
     },[])
        
     useEffect(()=>{
        console.log(dataState)
     },[dataState])
    


    function handleLogout(){
        fetch("http://127.0.0.1:8000/logout/",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token '+ cookies.token[0]
        },})
        .then(resp =>{
            console.log(resp)
            if (resp.ok == true){
                removeCookie("token")
                navigate("/",{replace:true})
            }
        })
        .catch(error =>{console.log(error)})
    }
   
    return(
        <div className="moviesPageContainer">
            <div style={{backgroundColor:"black"}}>
                <MoviesNav></MoviesNav>
            </div>    
            <div className="moviesBackground">
                <section className="crouselsection">
                    <Crousel Moviesdata={dataState} />
                    <div className="socialMedia-MoviesPage">
                        <div>
                            <SmBtn small={false} icon="facebook-f" color="blue" className="fb" text="facebook"></SmBtn>
                            <SmBtn small={false} icon="instagram" color="#ac2bac" className="fb" text="Instagram"></SmBtn>
                            <SmBtn small={false} icon="twitter" color="#1DA1F2" className="fb" text="twitter"></SmBtn>
                            <SmBtn small={false} icon="github" color="black" className="fb" text="github"></SmBtn>
                        </div>
                        <p style={{transform:"translateY(30%)"}}>
                            Watch Movies Online Free<br></br>
                            Watch all kinds of popular movies and forget about handing your money to netflix. At <span style={{color:"orange"}}>AFLIX</span>, A stands for Aree (free) !<br></br>
                            When sankes are born with two heads, they fight each other food, that's why we offer you the best place to watch movies and have the best experience ! <br></br>
                            Wubba Lubba Dub Dub !
                        </p>
                    </div>
                </section>
                <section className="moviesSection">
                    <Category ctg="Trending" />
                    <TrendingMovies />
                    <Category ctg="Latest" />
                    <LatestMovies />
                    <Category ctg="Upcoming" />
                    <UpcomingMovies />
                </section>
            </div>
        </div>
    )
}
export default MoviesPage;