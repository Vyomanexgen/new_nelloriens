import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommonAds from "../../components/CommonAds/CommonAds";
import Footer from "../../components/Footer";
import MainHeader from "../../components/MainHeader";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/Pagination";
import TopHeader from "../../components/TopHeader";
import useTranslation from "../../hooks/useTranslation";
import { fetchMovieDetail, fetchMovies } from "../../state/slices/moviesSlice";
import "./MoviesPage.css";

const MoviesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { movies = [], status } = useSelector((state) => state.movies || {});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use movies from Redux instead of hardcoded
  const recommendedMovies = movies;

  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);

    if (movie.id) {
      try {
        const resultAction = await dispatch(fetchMovieDetail(movie.id));
        if (fetchMovieDetail.fulfilled.match(resultAction)) {
          setSelectedMovie(() => ({ ...movie, ...resultAction.payload }));
        }
      } catch (e) {
        console.error("Failed to fetch movie details", e);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  const displayedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return recommendedMovies.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, itemsPerPage, recommendedMovies]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="movies-page">
      <TopHeader />
      <MainHeader siteName={t("siteName") + ".IN"} tagline={t("tagline")} />
      <Navbar includeSearch={false} />

      <main className="movies-main-content">
        <div className="container-fluid">
          {/* Recommended Movies Section */}
          <section className="movies-recommended-section">
            <div className="movies-section-heading">
              <h2 className="movies-heading-title">
                <i className="bi bi-film me-2 text-danger"></i>Movies
              </h2>
            </div>

            <div className="row">
              {/* Movies Grid Column */}
              <div className="col-lg-9">
                <div className="movies-cards-row">
                  {displayedMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card"
                      onClick={() => handleMovieClick(movie)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="movie-card-poster">
                        <img src={movie.poster} alt={movie.title} />
                        <div className="movie-rating-info">
                          <i className="bi bi-star-fill movie-star-icon"></i>
                          <span className="movie-rating">
                            {movie.rating}/10
                          </span>
                          <span className="movie-votes-inline">
                            {movie.voteCount} Votes
                          </span>
                        </div>
                      </div>
                      <div className="movie-card-content">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-genres">
                          {movie.genres && Array.isArray(movie.genres)
                            ? movie.genres.join("/")
                            : "General"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalItems={recommendedMovies.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>

              {/* Sidebar Column */}
              <div className="col-lg-3">
                <div className="common-ads-container">
                  <CommonAds />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer siteName={t("siteName") + ".IN"} tagline={t("FooterTagline")} />

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedMovie && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMovie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-5 text-center mb-3 mb-md-0">
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="img-fluid rounded"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="mb-3">
                    <h5>Overview</h5>
                    <p className="text-secondary">
                      {selectedMovie.overview ||
                        "No overview available for this movie yet. Catch it in theaters near you!"}
                    </p>
                  </div>
                  <div className="mb-3">
                    <strong>Genres: </strong>
                    <span className="text-muted">
                      {selectedMovie.genres && selectedMovie.genres.join(", ")}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Rating: </strong>
                    <span className="text-warning fw-bold">
                      <i className="bi bi-star-fill me-1"></i>
                      {selectedMovie.rating}/10
                    </span>
                  </div>
                  {selectedMovie.cast && (
                    <div className="mb-3">
                      <strong>Cast: </strong>
                      <span className="text-muted">
                        {selectedMovie.cast.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="danger">Book Tickets</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default MoviesPage;
