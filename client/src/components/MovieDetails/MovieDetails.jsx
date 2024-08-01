import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MovieDetails.scss'
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details: ', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="movie-detail-container"
      style={{ backgroundImage: `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : '/path/to/default-background.jpg'})` }}
    >
      <div className="movie-detail-overlay">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-detail-content">
          <h1>{movie.title} ({movie.release_date})</h1>
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre">{genre.name}</span>
            ))}
          </div>
          <div className="production-companies">
            {movie.production_companies.map((company) => (
              <span key={company.id} className="company">{company.name}</span>
            ))}
          </div>
          <p>{movie.overview}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Rating: {movie.vote_average.toFixed(2)}</p>
          <button className="back-button" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
