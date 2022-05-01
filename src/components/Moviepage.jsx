import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Moviepage = () => {
  const [input, setinput] = useState("kick");
  const [getmovies, setgetmovies] = useState([]);
  // `https://www.omdbapi.com/?apikey=c3bccce3&s=${input}`
  const getdata = () => {
    axios
      .get(
        // `https://api.themoviedb.org/3/movie/popular?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1&include_adult=false`
        `https://api.themoviedb.org/3/search/movie?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1&include_adult=false&query=${input}`
        // `https://api.themoviedb.org/3/search/movie?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US&page=1&include_adult=false`
      )
      .then((res) => {
        setgetmovies(res.data.results);
        console.log(res.data.results);
      });
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
  }, [input]);

  return (
    <div>
      <div className="topdiv">
        <h1>Movie App</h1>
        <input
          type="text"
          onChange={(e) => {
            debouncing(e);
          }}
        />
      </div>

      <div className="showmovie">
        {getmovies.length > 3 ? (
          getmovies.map((e, i) => {
            return (
              <Link to={`/movie/${e.id}`}>
                <div key={i} style={{ border: "2px solid red" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                    alt=""
                    width={"100px"}
                  />
                  <p>{e.original_title}</p>
                  <p>{e.release_date}</p>
                  <p>{e.id}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div>no data</div>
        )}
      </div>
    </div>
  );
};

export default Moviepage;
