import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./moviepage.css";

const Moviepage = () => {
  const [input, setinput] = useState("spider");
  const [getmovies, setgetmovies] = useState([]);
  const [movietype, setmovietype] = useState(null);
  const getdata = () => {
    //////////https://api.themoviedb.org/3/movie/top_rated?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1

    if (movietype) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movietype}?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1`
        )
        .then((res) => {
          setgetmovies(res.data.results);
          console.log(`movie type :${movietype}`);
        });
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1&include_adult=false&query=${input}`
        )
        .then((res) => {
          setgetmovies(res.data.results);
          console.log(res.data.results);
        });
    }
  };

  let id;
  const debouncing = (e) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      setinput(e.target.value);
    }, 3000);
  };

  useEffect(() => {
    getdata();
    // console.log(`movies ${movies}`);
  }, [input, movietype]);

  return (
    <div>
      <div className="topdiv">
        <h2>Movie App</h2>
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(e) => {
            setmovietype(null);
            debouncing(e);
          }}
        />
      </div>
      <div className="filterbtn">
        <button
          onClick={() => {
            setmovietype("popular");
          }}
        >
          Popular
        </button>
        <button
          onClick={() => {
            setmovietype("upcoming");
          }}
        >
          Upcoming
        </button>
        <button
          onClick={() => {
            setmovietype("top_rated");
          }}
        >
          Top Rated
        </button>
      </div>

      <div className="showmovie">
        {getmovies.length > 3 ? (
          getmovies.map((e, i) => {
            return (
              <Link to={`/movie/${e.id}`}>
                <div key={i}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                    alt=""
                    width={"100px"}
                  />
                  <div className="tdiv">
                    {/* <p>{e.original_title}</p> */}
                    {/* <p className="rd">{e.release_date}</p> */}
                    {/* <p>{e.id}</p> */}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Moviepage;
