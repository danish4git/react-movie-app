import React from "react";
import { useParams, useState } from "react-router-dom";

const Moviecard = () => {
  const { id } = useParams();

  // const [getmovies, setgetmovies] = useState([]);
  const getdata = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9d1ba1d73acfde590055a0c392c675b2&language=en-US`
      )
      .then((res) => {
        // setgetmovies(res.data.results);
        console.log(res);
      });
  };

  useEffect(() => {
    getdata();
    // console.log(`movies ${movies}`);
  }, []);
  return <div>Moviecard</div>;
};

export default Moviecard;
