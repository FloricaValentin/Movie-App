Movie App

This is a full-stack movie application that allows users to sign up, log in, and view a list of movies along with their details using the TMDB API. The backend is built with Node.js and PostgreSQL, while the frontend is built with React.

Features

User registration and authentication Display a list of movies from the TMDB API Search for movies View detailed information about a specific movie User-specific greeting and logout functionality

Tech Stack

Backend: Node.js, Express.js, PostgreSQL

Frontend: React.js,

Database: PostgreSQL

API: The Movie Database (TMDB) API

How to setup project

BACKEND : Install dependencies

Create a .env file in the backend directory and add your database credentials and JWT secret:

PG_USER=your_db_user

PG_HOST=localhost

PG_DATABASE=usermovies

PG_PASSWORD=your_db_password

PG_PORT=5432

JWT_SECRET=your_jwt_secret

Initialize the database

psql -U your_db_user -d usermovies -f init.sql

FRONTEND :

Install dependencies,

Create a .env file in the frontend directory and add your TMDB API key: REACT_APP_TMDB_API_KEY=your_tmdb_api_key
