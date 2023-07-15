import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFullPageLoader } from "../hooks/useFullPageLoader";
import moment from "moment";
import { MovieReview } from "./MovieReview";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa";
import languages from "../assets/documents/language-codes.json";
import { VideoModal } from "./VideoModal";

const MovieDetails = () => {
  const tmdb_auth = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAzNjE3ODc1OTA0Y2U1YTA4ODA5NDgxMjg1Y2IyOSIsInN1YiI6IjVmMzdhZDdlMTExZGExMDAzNjcwMjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j16rV8UTHRhwXgCR2NspfowgT9nptvTAdaVYl2prEkU",
  };
  const imgbaseURL = "https://image.tmdb.org/t/p/";
  const posterSize = "w342";
  const backdropWidth = "original";

  const currencyFormat = new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
  });
  const langs = languages;

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const params = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [movieGenres, setMovieGenres] = useState([]);
  const [movieCert, setMovieCert] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [movieTrailer, setMovieTrailer] = useState({});

  const [showPlayer, setShowPlayer] = useState(false);
  const handleOnPlayerClose = () => setShowPlayer(false);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    // Add leading zeros if necessary
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}h ${formattedMinutes}m`;
  };

  const getMovieReviewsByID = (movieId) => {
    // showLoader();
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
        {
          headers: tmdb_auth,
        }
      )
      .then((res) => {
        // console.log(res.data.results);
        setMovieReviews(res.data.results);
        // hideLoader();
      });
  };

  const getMovieCertificationsByID = (movieId) => {
    // showLoader();
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/release_dates`, {
        headers: tmdb_auth,
      })
      .then((res) => {
        // console.log(res.data.results);
        getCertiByCountry(res.data.results);
        // hideLoader();
      });
  };

  const getCertiByCountry = (certs) => {
    const cert = certs.find((cert) => cert.iso_3166_1 === "US");

    let release_date = cert.release_dates.find((rel_date) => {
      if (rel_date.type === 3) return rel_date;
    });

    if (release_date === undefined) {
      release_date = cert.release_dates.find((rel_date) => {
        return rel_date.certification !== undefined;
      });
    }
    // console.log(release_date);
    setMovieCert(release_date);
  };

  const getVideosByID = (movieId) => {
    // showLoader();
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: tmdb_auth,
      })
      .then((res) => {
        const movieVids = res.data.results;
        movieVids.find((video) => {
          if (video.type === "Trailer" && video.name === "Official Trailer") {
            // console.log(video);
            setMovieTrailer(video);
            // hideLoader();
          }
        });
      });
  };

  const getMovieByID = (movieId) => {
    // showLoader();
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: tmdb_auth,
      })
      .then((res) => {
        // console.log(res.data);
        setMovieDetails(res.data);
        setMovieGenres(res.data.genres);
        // hideLoader();
      });
  };

  useEffect(() => {
    showLoader();
    Promise.all([
      getMovieByID(params.id),
      getMovieCertificationsByID(params.id),
      getMovieReviewsByID(params.id),
      getVideosByID(params.id),
    ]).then(hideLoader());
  }, []);

  return (
    <div>
      <section className="min-h-screen">
        {Object.keys(movieDetails) !== 0 ? (
          <div className="my-8">
            <div
              className="py-12"
              style={{
                backgroundImage: `linear-gradient(
                to right,
                rgba(3, 37, 65, 1) 0%,
                rgba(3, 37, 65, 0.8) 100%
              ), url(${
                imgbaseURL + backdropWidth + movieDetails.backdrop_path
              })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                // backgroundPosition: "50% 50%",
              }}
            >
              <div className="card container mx-auto px-8 flex flex-col lg:flex-row lg:items-center gap-8">
                {/* poster */}
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
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 my-4">
                    <span className="chip uppercase">
                      {movieCert.certification ?? "unrated"}
                    </span>
                    <span className="">
                      {moment(movieCert?.release_date).format("YYYY/MM/DD")}{" "}
                      {"(US)"}
                    </span>
                    <div id="genres" className="flex gap-2">
                      {movieGenres.map((genre, idx) => (
                        <span className="chip" key={idx}>
                          {genre.name}
                        </span>
                      ))}
                    </div>
                    <span>{formatDuration(movieDetails.runtime)}</span>
                  </div>

                  <div className="my-8">
                    <button
                      className="button"
                      onClick={() => {
                        // console.log(movieTrailer);
                        setShowPlayer(true);
                      }}
                    >
                      Play Trailer
                    </button>
                    {/* trailer popup */}
                    <VideoModal
                      visible={showPlayer}
                      close={handleOnPlayerClose}
                      trailer={movieTrailer}
                    />
                  </div>
                  {/*  */}
                  <div className="my-4">
                    <span className="italic">{movieDetails.tagline}</span>
                  </div>
                  <div id="overview" className="my-4">
                    <h2 className="text-xl font-bold my-4">Overview</h2>
                    <p>{movieDetails.overview}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mx-auto px-8 my-4 lg:my-8 flex flex-col-reverse lg:flex-row gap-2 lg:gap-8">
              <div className="lg:w-9/12">
                <h2 className="text-xl font-bold text-tmdbDarkBlue my-4">
                  Reviews
                </h2>

                <div className="review-list flex flex-col gap-8">
                  {movieReviews.map((review, idx) => (
                    <MovieReview key={idx} review={review} />
                  ))}
                </div>
              </div>
              {/* sidebar */}
              <div className="lg:w-3/12">
                <div className="id-socials h-7 my-4 lg:mb-16 text-2xl flex gap-4 items-center text-tmdbDarkBlue">
                  <a
                    className="link"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    className="link"
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    className="link"
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    className="link"
                    href={movieDetails.homepage}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaLink />
                  </a>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="font-bold text-gray-">Status</p>
                    <p>{movieDetails.status}</p>
                  </div>
                  <div>
                    <p className="font-bold">Original Language</p>
                    <p>{langs[movieDetails.original_language]}</p>
                  </div>
                  <div>
                    <p className="font-bold">Budget</p>
                    <p>{currencyFormat.format(movieDetails.budget)}</p>
                  </div>
                  <div>
                    <p className="font-bold">Revenue</p>
                    <p>{currencyFormat.format(movieDetails.revenue)}</p>
                  </div>
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
