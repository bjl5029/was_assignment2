import React from 'react';
import '../styles/MovieModal.css';

const MovieModal = ({ setModalOpen, movie }) => {
  const handleClose = (e) => {
    e.stopPropagation();  // 이벤트 버블링 방지
    setModalOpen(false);  // 모달 닫기
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal">
          <span 
            onClick={handleClose}
            className="modal-close"
          >
            X
          </span>
          
          <div className="modal-content">
            <img 
              className="modal-poster"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title || movie.name}
            />

            <div className="modal-info">
              <h2>{movie.title || movie.name}</h2>
              <p className="modal-overview">{movie.overview}</p>
              
              <div className="modal-details">
                <p>평점: {movie.vote_average}</p>
                <p>개봉일: {movie.release_date || movie.first_air_date}</p>
              </div>

              {/* 찜하기 버튼을 모달 내용 맨 아래로 이동 */}
              <div style={{ 
                padding: '20px', 
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // 기존 찜하기 로직
                    // 여기에 찜하기 기능 구현
                  }}
                  style={{
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
