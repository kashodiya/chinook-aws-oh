






























































































































































import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/genres`);
        setGenres(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('Failed to load genres. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        setGenres([
          { id: 1, name: 'Rock' },
          { id: 2, name: 'Jazz' },
          { id: 3, name: 'Metal' },
          { id: 4, name: 'Alternative & Punk' },
          { id: 5, name: 'Rock And Roll' },
          { id: 6, name: 'Blues' },
          { id: 7, name: 'Latin' },
          { id: 8, name: 'Reggae' },
          { id: 9, name: 'Pop' },
          { id: 10, name: 'Soundtrack' },
          { id: 11, name: 'Bossa Nova' },
          { id: 12, name: 'Easy Listening' },
          { id: 13, name: 'Heavy Metal' },
          { id: 14, name: 'R&B/Soul' },
          { id: 15, name: 'Electronica/Dance' },
          { id: 16, name: 'World' },
          { id: 17, name: 'Hip Hop/Rap' },
          { id: 18, name: 'Science Fiction' },
          { id: 19, name: 'TV Shows' },
          { id: 20, name: 'Sci Fi & Fantasy' },
          { id: 21, name: 'Drama' },
          { id: 22, name: 'Comedy' },
          { id: 23, name: 'Alternative' },
          { id: 24, name: 'Classical' },
          { id: 25, name: 'Opera' }
        ]);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <Container>
        <p>Loading genres...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="alert alert-danger">{error}</div>
      </Container>
    );
  }

  // Generate a color based on the genre name for visual variety
  const getGenreColor = (genreName) => {
    const colors = [
      'primary', 'secondary', 'success', 'danger', 
      'warning', 'info', 'dark'
    ];
    
    // Use the sum of character codes to determine a color
    const charSum = genreName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  return (
    <Container>
      <h1 className="mb-4">Music Genres</h1>
      <p>Browse our music collection by genre.</p>
      
      <Row>
        {genres.map((genre) => (
          <Col key={genre.id} lg={3} md={4} sm={6} className="mb-4">
            <Card 
              className="h-100 genre-card text-center" 
              bg={getGenreColor(genre.name)} 
              text="white"
            >
              <Card.Body>
                <Card.Title className="h4">{genre.name}</Card.Title>
                <Link 
                  to={`/genres/${genre.id}`} 
                  className="btn btn-outline-light mt-3"
                >
                  Browse Tracks
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GenresPage;






























































































































































