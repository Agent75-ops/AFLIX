import React from 'react'
import {Link} from 'react-router-dom'

function Category(props){

    const styles ={
        container:{
            display : "flex",
            width:"100%",
            margin:"5rem 0 1.6rem 0",
            justifyContent:"space-between",
            color:"white",
            
            alignItems:"center",
        },
        h2:{
            color:"orange",
            fontWeight:"100",
            borderBottom: "0.1px solid transparent",
            borderImage: "linear-gradient(to right, rgba(249, 105, 14,1),rgba(0,0,0,0)) 0 0 100% 0",
            paddingBottom : "9px"
        }
    }
    return (
        <div style={styles.container}>
            <h2 style={styles.h2}>{props.ctg}</h2>
            <Link>View all <i class="fa-solid fa-circle-arrow-right"></i></Link>
        </div>
    )
}

export default Category;