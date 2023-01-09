import React,{useState,useEffect} from "react";
import { Container } from "./TrendingMovies";
import MovieCard from "./Moviecard";
function UpcomingMovies(){
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        async function Fetch(){
            const res = await fetch("http://127.0.0.1:8000/api/upcoming/")
            const data = await res.json()
            setMovies(data)
            return data
        }
        Fetch()
    },[])

    return(
        <Container>
        {movies.map((movie)=>{
            return <MovieCard key={movie.id} title={movie.title} rating={movie.ratings.imdb} poster={movie.poster}/>
        })}
        </Container>
    )

}

export default UpcomingMovies;