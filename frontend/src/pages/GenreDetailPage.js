




































































































































































import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const GenreDetailPage = () => {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch genre details
        const genreResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/genres/${id}`);
        setGenre(genreResponse.data);
        
        // Fetch tracks for this genre
        const tracksResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracks/genre/${id}`);
        setTracks(tracksResponse.data);
        setFilteredTracks(tracksResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching genre data:', error);
        setError('Failed to load genre data. Please try again later.');
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        setGenre({ id: parseInt(id), name: 'Genre ' + id });
        
        const placeholderTracks = [];
        for (let i = 1; i <= 20; i++) {
          placeholderTracks.push({
            id: i,
            name: `Track ${i}`,
            milliseconds: Math.floor(Math.random() * 300000) + 120000,
            unitPrice: 0.99,
            composer: `Composer ${Math.floor(Math.random() * 5) + 1}`,
            album: {
              id: Math.floor(Math.random() * 10) + 1,
              title: `Album ${Math.floor(Math.random() * 10) + 1}`,
              artist: {
                id: Math.floor(Math.random() * 5) + 1,
                name: `Artist ${Math.floor(Math.random() * 5) + 1}`
              }
            }
          });
        }
        
        setTracks(placeholderTracks);
        setFilteredTracks(placeholderTracks);
      }
    };

    fetchGenreData();
  }, [id]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTracks(tracks);
    } else {
      const filtered = tracks.filter(track => 
        track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (track.album?.title && track.album.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (track.album?.artist?.name && track.album.artist.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTracks(filtered);
    }
  }, [searchTerm, tracks]);

  const formatDuration = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return (
      <Container>
        <p>Loading genre details...</p>
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
      <h1 className="mb-4">{genre.name} Tracks</h1>
      
      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search tracks, albums, or artists..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form>
      
      {filteredTracks.length === 0 ? (
        <Alert variant="info">No tracks found for this genre.</Alert>
      ) : (
        <>
          <p>{filteredTracks.length} tracks found</p>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Duration</th>
                <th>Composer</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTracks.map((track) => (
                <tr key={track.id} className="track-list-item">
                  <td>{track.name}</td>
                  <td>
                    {track.album?.artist ? (
                      <Link to={`/artists/${track.album.artist.id}`}>
                        {track.album.artist.name}
                      </Link>
                    ) : 'Unknown'}
                  </td>
                  <td>
                    {track.album ? (
                      <Link to={`/albums/${track.album.id}`}>
                        {track.album.title}
                      </Link>
                    ) : 'Unknown'}
                  </td>
                  <td>{formatDuration(track.milliseconds)}</td>
                  <td>{track.composer || 'Unknown'}</td>
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
        </>
      )}
    </Container>
  );
};

export default GenreDetailPage;




































































































































































