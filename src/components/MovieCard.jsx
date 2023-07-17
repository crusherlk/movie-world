import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movieDetails }) => {
  const imgbaseURL = "https://image.tmdb.org/t/p/";
  const posterSize = "w500";

  const navigate = useNavigate();

  return (
    <div className="movie-card border-2 rounded-xl shadow-md overflow-hidden">
      <div
        className="movie-poster bg-gray-400 relative cursor-pointer"
        onClick={() => {
          navigate(`/movie/${movieDetails.id}`);
        }}
      >
        <img
          draggable="false"
          loading="lazy"
          className="w-full h-full object-fill"
          src={imgbaseURL + posterSize + movieDetails.poster_path}
          alt={movieDetails.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-tmdbLightBlue/50 transition-colors ease-in-out duration-300"></div>
      </div>
      <div className="movie-content px-2 py-4">
        <h1
          className="link font-bold"
          onClick={() => {
            navigate(`/movie/${movieDetails.id}`);
          }}
        >
          {movieDetails.title}
        </h1>
        <p className="text-gray-500">
          {DateTime.fromFormat(
            movieDetails.release_date,
            "yyyy-MM-dd"
          ).toFormat("MMMM dd, yyyy")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
