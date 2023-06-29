import { DateTime } from "luxon";

const MovieCard = ({ movieDetails }) => {
  const imgbaseURL = "https://image.tmdb.org/t/p/";
  const posterSize = "w500";

  return (
    <div className="movie-card border-2 rounded-xl shadow-md overflow-hidden">
      <div className="movie-poster bg-gray-400">
        <img
          draggable="false"
          loading="lazy"
          className="link w-full h-full object-fill"
          src={imgbaseURL + posterSize + movieDetails.poster_path}
          alt={movieDetails.title}
        />
      </div>
      <div className="movie-content px-2 py-4">
        <h1 className="link font-bold">{movieDetails.title}</h1>
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
