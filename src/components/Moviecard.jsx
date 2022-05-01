import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./moviecard.css";

const Moviecard = () => {
  const { id } = useParams();

  const [getmovies, setgetmovies] = useState([]);
  const getdata = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US`
      )
      .then((res) => {
        setgetmovies(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getdata();
    // console.log(`movies ${movies}`);
  }, []);
  return (
    <div className="mcdiv">
      <div className="mcimage" key={`${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${getmovies.poster_path}`}
          alt=""
          width={"100px"}
        />
      </div>
      <div className="mcbot">
        <p>MOVIE NAME: {getmovies.original_title}</p>
        <p>MOVIE RELEASE DATE : {getmovies.release_date}</p>
        <p>OVERVIEW : {getmovies.overview}</p>
        <p>VOTE AVERAGE : {getmovies.vote_average}</p>
      </div>
    </div>
  );
};

export default Moviecard;
