import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../styles/Home.scss";
import TrendingPaginationButtons from "../pagination/TrendingPaginationButtons";
import { useFullPageLoader } from "../hooks/useFullPageLoader";
import SearchPaginationButtons from "../pagination/SearchPaginationButtons";

const Home = () => {
  const tmdb_auth = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODAzNjE3ODc1OTA0Y2U1YTA4ODA5NDgxMjg1Y2IyOSIsInN1YiI6IjVmMzdhZDdlMTExZGExMDAzNjcwMjk1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j16rV8UTHRhwXgCR2NspfowgT9nptvTAdaVYl2prEkU",
  };
  const [searchValue, setSearchValue] = useState("");
  const [hideTrending, setHideTrending] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedPages, setSearchedPages] = useState();
  const [searchInfo, setSearchInfo] = useState({});

  const searchSecRef = useRef(null);
  const scrollToSearchSec = () => {
    searchSecRef.current.scrollIntoView();
  };

  const [trendingMovieList, setTrendingMovieList] = useState([]);
  const [trendingPages, setTrendingPages] = useState();
  const [currentTrendingPage, setCurrentTrendingPage] = useState(1);

  const [loader, showLoader, hideLoader] = useFullPageLoader();

  const trendingRef = useRef(null);
  const scrollToTrending = () => {
    trendingRef.current.scrollIntoView();
  };

  const getSearchedMovies = (pageNo) => {
    // console.log(pageNo);
    const currentPageNo = pageNo ?? 1;
    showLoader();
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${currentPageNo}`,
        {
          headers: tmdb_auth,
        }
      )
      .then((res) => {
        // console.log(res.data.total_pages);
        setSearchedPages(res.data.total_pages);
        setSearchedMovies(res.data.results);
        setSearchInfo({
          keyValue: searchValue,
          total_results: res.data.total_results,
        });

        hideLoader();
      });
  };

  const getTrendingMovies = useCallback(() => {
    showLoader();
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentTrendingPage}`,
        {
          headers: tmdb_auth,
        }
      )
      .then((res) => {
        // console.log(currentTrendingPage);
        setTrendingPages(100);
        setTrendingMovieList(res.data.results);
        hideLoader();
      });
  }, [currentTrendingPage]);

  useEffect(() => {
    getTrendingMovies();
  }, [getTrendingMovies]);

  return (
    <div id="home" className="container mx-auto min-h-screen">
      {/* banner */}
      <section className="banner h-[20rem] text-white flex flex-col justify-center items-center lg:items-start px-8">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-center lg:text-start">
          Millions of movies discover. Explore now.
        </p>
        <div className="search-box flex flex-col lg:flex-row items-center gap-2 pt-4">
          <input
            type="text"
            id="search_query"
            name="search_query"
            placeholder="Search for a Movie..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (searchValue !== "") {
                getSearchedMovies();
                setHideTrending(true);
              } else {
                setCurrentTrendingPage(1);
                setHideTrending(false);
              }
            }}
          >
            Search
          </button>
        </div>
      </section>

      {hideTrending ? (
        <div>
          {/* search.. */}
          {searchedMovies.length !== 0 ? (
            <section ref={searchSecRef} className="search-sec my-8 px-8">
              {searchInfo.total_results && searchInfo.keyValue ? (
                <h1 className="text-2xl font-bold">
                  There are {searchInfo.total_results ?? 0} results found
                  related to the search term &quot;{searchInfo.keyValue}&quot;
                </h1>
              ) : null}
              <div className="movie-list grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 my-8">
                {searchedMovies.map((movie, idx) => (
                  <MovieCard key={idx} movieDetails={movie} />
                ))}
              </div>
              {/* search pagination */}
              <SearchPaginationButtons
                totalPages={searchedPages}
                searchMovies={getSearchedMovies}
                gotoSearch={scrollToSearchSec}
              />
            </section>
          ) : (
            <div className="my-8 px-8">
              <h1 className="text-2xl font-bold text-center">
                No movies found
              </h1>
            </div>
          )}

          {/*  */}
        </div>
      ) : (
        <div>
          {/* trending */}

          {trendingMovieList.length !== 0 ? (
            <section ref={trendingRef} className="trending my-8 px-8">
              <h1 className="text-2xl font-bold">Trending</h1>
              <div className="movie-list grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 my-8">
                {trendingMovieList.map((movie, idx) => (
                  <MovieCard key={idx} movieDetails={movie} />
                ))}
              </div>
              {/* trending pagination */}
              <TrendingPaginationButtons
                totalPages={trendingPages}
                setPage={setCurrentTrendingPage}
                goToTrending={scrollToTrending}
              />
            </section>
          ) : (
            <div className="my-8 px-8">
              <h1 className="text-2xl font-bold text-center">
                No movies found
              </h1>
            </div>
          )}

          {/*  */}
        </div>
      )}

      {loader}
    </div>
  );
};

export default Home;
