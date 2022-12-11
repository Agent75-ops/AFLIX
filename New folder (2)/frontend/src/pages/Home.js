import React from "react";
import {useState} from "react"
import btm from '../photos/1.png'
import  img1 from '../photos/img1.jpg';
import  img2 from '../photos/img2.jpg';
import {Button} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import InputField from "../components/input";
import Block from "../components/Blocks";
import Footer from "../components/Footer";
import Navbar from "../components/navbar"
function Home(){
    const [text,setText]= useState("");
    function handleValue(e){
        e.preventdefault()
        setText(e.target.value)

    }

    return(
        <>
        <div className="page1">
            <div className="page1-container">
                <Navbar />
                <div className="main-content">
                    <div className="parg">
                        <h2>Get Into the paradise of movies</h2>
                        <h3>Where Filmers are born</h3>
                    </div>
                            <InputField lab={true}/> 
                    </div>
            </div>
        </div>
        <div className="emptyline"></div>
        <div className="page2">
            <div className="page2-content">
                <div className="text">
                    <div>
                    <h2>Watch,</h2>
                    <h2>Download,</h2>
                    <h3>And Enjoy Everywhere !</h3>
                    <br></br>
                    </div>
                    <p>
                        Watch on all kind of devices thousands of movies
                        and have the ability to Download on your own device 
                        and watch at any time anywhere. Available on Apple, Samsung,
                        Nokia, Macos, Windows, Microwave, Toilet Papers and Sterling's butt.
                    </p>
                </div>
                <Block place={img1} title="momento"/>
                <Block place={img2} title="deadpool"/>
            </div>   
        </div>
        <div className="emptyline"></div>
        <div className="page3">
            <div className="page3-content">
                <InputField lab={false}/>
                <p>Enter Your email now and Join the best movie comunity in one click !</p>
                <br></br>
                <Footer className='bg-dark'/>
            </div>
        </div>
        <div className="emptyline"></div>
           
        </>
    )
}

export default Home;