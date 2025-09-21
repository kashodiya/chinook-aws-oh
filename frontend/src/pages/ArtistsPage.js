












































































































































import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArtistsPage = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/artists`);
        setArtists(response.data);
        setFilteredArtists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        const placeholderArtists = [
          { id: 1, name: 'AC/DC' },
          { id: 2, name: 'Accept' },
          { id: 3, name: 'Aerosmith' },
          { id: 4, name: 'Alanis Morissette' },
          { id: 5, name: 'Alice In Chains' },
          { id: 6, name: 'Antônio Carlos Jobim' },
          { id: 7, name: 'Apocalyptica' },
          { id: 8, name: 'Audioslave' },
          { id: 9, name: 'BackBeat' },
          { id: 10, name: 'Billy Cobham' },
          { id: 11, name: 'Black Label Society' },
          { id: 12, name: 'Black Sabbath' }
        ];
        
        setArtists(placeholderArtists);
        setFilteredArtists(placeholderArtists);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArtists(artists);
    } else {
      const filtered = artists.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArtists(filtered);
    }
  }, [searchTerm, artists]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <h1 className="mb-4">Artists</h1>
      
      <Form className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search artists..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Form>
      
      {loading ? (
        <p>Loading artists...</p>
      ) : (
        <>
          <p>{filteredArtists.length} artists found</p>
          <Row>
            {filteredArtists.map((artist) => (
              <Col key={artist.id} lg={3} md={4} sm={6} className="mb-4">
                <Card className="h-100 artist-card">
                  <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${artist.name}`} />
                  <Card.Body>
                    <Card.Title>{artist.name}</Card.Title>
                    <Link to={`/artists/${artist.id}`} className="btn btn-primary">
                      View Albums
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default ArtistsPage;












































































































































