import React from "react";
import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


    let HoverDiv = styled.div`
        width:100%;
        height:100%;
        background-color:rgba(0,0,0,0.6);
        display:flex;
        flex-direction:column;
        justify-content:start;
        gap:10%;
        color:orange;
        opacity:0;
        transition:all 0.4s;
    `
function MovieCard(props){
    let Cardcontainer= styled.div`
        box-sizing: border-box;
        width: 190px;
        height: 254px;
        background: url(${props.poster});
        background-position:center;
        background-size:cover;
        border: 1px solid white;
        box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
        backdrop-filter: blur(6px);
        border-radius: 17px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        font-weight: bolder;
        overflow:hidden;
        &:hover{
            border: 1px solid orange;
            transform: scale(1.05);
        }
        &:active {
            transform: scale(0.95) rotateZ(6deg);
          }
        &:hover #HoverDiv{
            opacity:1;
        }
    `
    const playButton = {
        fontSize:"3.5rem"
    }
    const Title = styled.div`
    color:white;
    margin:0;
    display:block;
    white-space: nowrap;
    padding:0;
    transition: opacity 0.3s;
    height:4vh;
    width:14vw;
    font-size:1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover{
        opacity:0.5;
    }
    `
    
    return(
        <div style={{display:"flex",flexDirection:"column",gap:"4px"}}>
            <Cardcontainer>
                <Link style={{height:"100%",width:"100%"}} to="/" >
                    <HoverDiv id="HoverDiv">
                        <div style={{marginTop:"10px"}}>
                            <i className="fa-solid fa-star"></i>
                            <p>{props.rating}</p>
                        </div>
                        <i style={playButton} className="fa-regular fa-circle-play"></i>
                    </HoverDiv>
                </Link> 
            </Cardcontainer>
            <Link to="#" style={{overflow: "hidden",
                                textOverflow: "ellipsis",
                                display:"inline-block",
                                width:"fit-content",
                                height:"fit-content"
                                }}>
                <Title>{props.title}</Title>
            </Link>
        </div>
       
    )
}

export default MovieCard;