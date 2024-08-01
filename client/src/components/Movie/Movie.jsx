import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './Movie.scss'

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`);
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies: ', error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'jwt_token': localStorage.getItem('token')
        }
      });

      const parseData = await res.json();
      if (res.ok) {
        setName(parseData.user_name);
      } else {
        throw new Error(parseData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
    }
  };

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="App">
      <div className='header'>
        <h1>Movies App</h1>
        <div className='details'>
          <h2>Welcome {name}</h2>
          <button onClick={e => logout(e)} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <div className="movies-list">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/moviedetails/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h2>{movie.title}</h2>
            </Link>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average.toFixed(2)}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
