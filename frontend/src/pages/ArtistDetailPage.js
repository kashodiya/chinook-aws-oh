


















































































































































import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch artist details
        const artistResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/artists/${id}`);
        setArtist(artistResponse.data);
        
        // Fetch albums by this artist
        const albumsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/albums/artist/${id}`);
        setAlbums(albumsResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artist data:', error);
        setError('Failed to load artist data. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        setArtist({ id: parseInt(id), name: 'Artist ' + id });
        
        setAlbums([
          { id: 1, title: 'Album 1', artist: { id: parseInt(id), name: 'Artist ' + id } },
          { id: 2, title: 'Album 2', artist: { id: parseInt(id), name: 'Artist ' + id } },
          { id: 3, title: 'Album 3', artist: { id: parseInt(id), name: 'Artist ' + id } }
        ]);
      }
    };

    fetchArtistData();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <p>Loading artist details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={4}>
          <img 
            src={`https://via.placeholder.com/300?text=${artist.name}`} 
            alt={artist.name} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h1>{artist.name}</h1>
          <p className="lead">
            {albums.length} {albums.length === 1 ? 'album' : 'albums'} available
          </p>
        </Col>
      </Row>

      <h2 className="mb-4">Albums</h2>
      <Row>
        {albums.length === 0 ? (
          <Col>
            <Alert variant="info">No albums found for this artist.</Alert>
          </Col>
        ) : (
          albums.map((album) => (
            <Col key={album.id} md={3} sm={6} className="mb-4">
              <Card className="h-100 album-card">
                <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${album.title}`} />
                <Card.Body>
                  <Card.Title>{album.title}</Card.Title>
                  <Link to={`/albums/${album.id}`} className="btn btn-primary">
                    View Tracks
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ArtistDetailPage;


















































































































































