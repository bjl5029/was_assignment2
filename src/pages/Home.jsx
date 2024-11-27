import React, { useState, useEffect, useCallback } from 'react';
import TMDbAPI from '../services/URL.ts';
import MovieCard from '../components/MovieCard';
import '../styles/Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      const data = await TMDbAPI.getPopularMovies(page);
      
      if (data.results.length === 0) {
        setHasMore(false);
        return;
      }

      setMovies(prev => [...prev, ...data.results]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchMovies();
  }, []);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        fetchMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMovies]);

  return (
    <div className="home">
      <h1>인기 영화</h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}-${Math.random()}`} movie={movie} />
        ))}
      </div>
      {loading && <p className="loading">Loading...</p>}
      {!hasMore && <p className="end-message">더 이상 영화가 없습니다.</p>}
    </div>
  );
};

export default Home;
