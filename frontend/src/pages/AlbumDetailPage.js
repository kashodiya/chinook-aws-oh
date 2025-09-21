























































































































































import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch album details
        const albumResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/albums/${id}`);
        setAlbum(albumResponse.data);
        
        // Fetch tracks for this album
        const tracksResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracks/album/${id}`);
        setTracks(tracksResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching album data:', error);
        setError('Failed to load album data. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        setAlbum({ 
          id: parseInt(id), 
          title: 'Album ' + id,
          artist: { id: 1, name: 'Artist Name' }
        });
        
        setTracks([
          { id: 1, name: 'Track 1', milliseconds: 240000, unitPrice: 0.99, composer: 'Composer 1', genre: { name: 'Rock' } },
          { id: 2, name: 'Track 2', milliseconds: 180000, unitPrice: 0.99, composer: 'Composer 2', genre: { name: 'Rock' } },
          { id: 3, name: 'Track 3', milliseconds: 210000, unitPrice: 0.99, composer: 'Composer 1', genre: { name: 'Rock' } },
          { id: 4, name: 'Track 4', milliseconds: 260000, unitPrice: 0.99, composer: 'Composer 3', genre: { name: 'Rock' } }
        ]);
      }
    };

    fetchAlbumData();
  }, [id]);

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (loading) {
    return (
      <Container>
        <p>Loading album details...</p>
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
            src={`https://via.placeholder.com/300?text=${album.title}`} 
            alt={album.title} 
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h1>{album.title}</h1>
          <h3>
            <Link to={`/artists/${album.artist.id}`}>{album.artist.name}</Link>
          </h3>
          <p className="lead">
            {tracks.length} {tracks.length === 1 ? 'track' : 'tracks'}
          </p>
        </Col>
      </Row>

      <h2 className="mb-4">Tracks</h2>
      {tracks.length === 0 ? (
        <Alert variant="info">No tracks found for this album.</Alert>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Composer</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <tr key={track.id} className="track-list-item">
                <td>{index + 1}</td>
                <td>{track.name}</td>
                <td>{formatDuration(track.milliseconds)}</td>
                <td>{track.composer || 'Unknown'}</td>
                <td>{track.genre?.name || 'Unknown'}</td>
                <td>${track.unitPrice.toFixed(2)}</td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => addToCart(track)}
                  >
                    Add to Cart
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AlbumDetailPage;























































































































































