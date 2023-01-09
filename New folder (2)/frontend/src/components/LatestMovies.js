import React ,{useEffect,useState} from "react";
import { Container } from "./TrendingMovies";
import MovieCard from "./Moviecard";
function LatestMovies(){
    const [latestMovies, SetLatestMovies] = useState([]);
    useEffect(()=>{
        async function Fetch(){
            const data = await fetch("http://127.0.0.1:8000/api/latest/",{method:"GET"})
            const resp = await data.json()
            SetLatestMovies(resp)
            return resp
        }
        Fetch()
    },[])
    return(
    <Container>
        {
            latestMovies.map((movie)=>{
                return <MovieCard key={movie.id} title={movie.title} poster={movie.poster} rating={movie.ratings.imdb}/>
            })
        }
    </Container>
    
    )
}

export default LatestMovies;