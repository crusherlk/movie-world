import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFullPageLoader } from "../hooks/useFullPageLoader";
import moment from "moment";

const MovieDetails = () => {
  const tmdb_auth = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAzNjE3ODc1OTA0Y2U1YTA4ODA5NDgxMjg1Y2IyOSIsInN1YiI6IjVmMzdhZDdlMTExZGExMDAzNjcwMjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j16rV8UTHRhwXgCR2NspfowgT9nptvTAdaVYl2prEkU",
  };
  const imgbaseURL = "https://image.tmdb.org/t/p/";
  const posterSize = "w342";
  const backdropWidth = "original";

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const params = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieGenres, setMovieGenres] = useState([]);

  const getMovieByID = (movieId) => {
    showLoader();
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: tmdb_auth,
      })
      .then((res) => {
        console.log(res.data);
        setMovieDetails(res.data);
        setMovieGenres(res.data.genres);
        hideLoader();
      });
  };

  useEffect(() => {
    getMovieByID(params.id);
  }, []);

  return (
    <div>
      <section className="min-h-screen">
        {Object.keys(movieDetails) !== 0 ? (
          <div
            className="py-12 my-8"
            style={{
              backgroundImage: `linear-gradient(
                to right,
                rgba(3, 37, 65, 1) 0%,
                rgba(3, 37, 65, 0.6) 100%
              ), url(${
                imgbaseURL + backdropWidth + movieDetails.backdrop_path
              })`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="card container mx-auto flex gap-8">
              <div className="w-[342px] flex-none bg-gray-400 rounded-xl shadow-md overflow-hidden">
                <img
                  draggable="false"
                  loading="lazy"
                  className="w-full h-full object-fill"
                  src={imgbaseURL + posterSize + movieDetails.poster_path}
                  alt={movieDetails.title}
                />
              </div>
              <div className="info text-white">
                <h1 className="text-3xl mb-4">
                  <span className="font-bold">{movieDetails.title}</span>{" "}
                  <span>
                    (
                    {moment(movieDetails?.release_date, "YYYY-MM-DD").format(
                      "YYYY"
                    )}
                    )
                  </span>
                </h1>
                <div className="flex gap-8 my-4 items-center">
                  <span className="chip bg-tmdbLightBlue uppercase">pg-13</span>
                  <span className="">
                    {moment(movieDetails?.release_date, "YYYY-MM-DD").format(
                      "YYYY/MM/DD"
                    )}
                  </span>
                  <div id="genres" className="flex gap-2">
                    {movieGenres.map((genre, idx) => (
                      <span className="chip bg-tmdbLightGreen" key={idx}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="my-4">
                  <button className="button">Play Trailer</button>
                </div>
                <div className="my-4">
                  <span>{movieDetails.tagline}</span>
                </div>
                <div id="overview" className="my-4">
                  <h2 className="text-xl font-bold my-4">Overview</h2>
                  <p>{movieDetails.overview}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-8 px-8">
            <h1 className="text-2xl font-bold text-center">
              Couldn&apos;t find any infomation
            </h1>
          </div>
        )}
      </section>
      {loader}
    </div>
  );
};

export default MovieDetails;
