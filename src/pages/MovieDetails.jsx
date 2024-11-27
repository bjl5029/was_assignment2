import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useNavigate 추가
import TMDbAPI from '../services/URL.ts';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // 네비게이션 추가
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await TMDbAPI.getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  // 닫기 버튼 핸들러
  const handleClose = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className="movie-details-page">
      {/* 닫기 버튼 추가 */}
      <button 
        onClick={handleClose}
        style={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        X
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="movie-details-poster"
      />
      <div className="movie-details-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        
        {/* 찜하기 버튼을 하단에 추가 */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // 찜하기 로직 추가
          }}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#E50914',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          찜하기
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;