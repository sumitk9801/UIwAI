import React from "react";

import { useState } from 'react';

export const MovieTicketBookingCard = ({
  movie = {
    title: 'Inception',
    genre: 'Sci-Fi / Thriller',
    rating: 8.8,
    duration: '2h 28m',
    language: 'English',
    poster: 'https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Inception',
  },
  showtimes = ['10:30 AM', '1:45 PM', '4:20 PM', '7:00 PM', '9:30 PM'],
  pricePerSeat = 12,
  onBook = (details) => console.log('Booking:', details),
}) => {
  const [selectedTime, setSelectedTime] = useState(showtimes[0]);
  const [seatCount, setSeatCount] = useState(1);

  const totalPrice = pricePerSeat * seatCount;

  const handleBook = () => {
    onBook({
      movie: movie.title,
      time: selectedTime,
      seats: seatCount,
      total: totalPrice,
    });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '700px',
    margin: '20px auto',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  };

  const posterStyle = {
    width: '200px',
    minHeight: '300px',
    backgroundImage: `url(${movie.poster})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexShrink: 0,
  };

  const detailsStyle = {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: '#1a1a2e',
  };

  const metaStyle = {
    fontSize: '14px',
    color: '#555',
    marginBottom: '6px',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const starStyle = {
    color: '#f5c518',
    fontSize: '18px',
    marginRight: '4px',
  };

  const ratingValueStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: '6px',
  };

  const sectionTitleStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a1a2e',
    margin: '16px 0 8px 0',
  };

  const showtimeContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  const showtimeButtonStyle = (isSelected) => ({
    padding: '8px 12px',
    borderRadius: '20px',
    border: isSelected ? '2px solid #e50914' : '2px solid #ddd',
    backgroundColor: isSelected ? '#e50914' : '#fff',
    color: isSelected ? '#fff' : '#333',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  });

  const seatSelectorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '8px',
  };

  const seatButtonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={posterStyle} />
      <div style={detailsStyle}>
        <h2 style={titleStyle}>{movie.title}</h2>
        <p style={metaStyle}>{movie.genre}</p>
        <p style={metaStyle}>{movie.duration} • {movie.language}</p>
        <div style={ratingStyle}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={starStyle}>★</span>
          ))}
          <span style={ratingValueStyle}>{movie.rating}</span>
        </div>
        <p style={sectionTitleStyle}>Showtimes</p>
        <div style={showtimeContainerStyle}>
          {showtimes.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              style={showtimeButtonStyle(selectedTime === time)}
            >
              {time}
            </button>
          ))}
        </div>
        <p style={sectionTitleStyle}>Seats</p>
        <div style={seatSelectorStyle}>
          <button
            onClick={() => setSeatCount((prev) => Math.max(1, prev - 1))}
            style={seatButtonStyle}
          >
            -
          </button>
          <span>{seatCount}</span>
          <button
            onClick={() => setSeatCount((prev) => prev + 1)}
            style={seatButtonStyle}
          >
            +
          </button>
        </div>
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '12px' }}>
          Total: ${totalPrice}
        </p>
        <button
          onClick={handleBook}
          style={
            {
              width: '100%',
              padding: '12px',
              backgroundColor: '#e50914',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '16px',
              transition: 'background-color 0.2s',
            }
          }
        >
          Book Tickets
        </button>
      </div>
    </div>
  );
}