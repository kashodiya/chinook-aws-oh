







































































































































import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // In a real application, we would have endpoints for featured content
        // For now, we'll just get some random data
        const artistsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/artists`);
        const albumsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/albums`);
        const genresResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/genres`);
        
        // Get a random selection of artists, albums, and genres
        setFeaturedArtists(artistsResponse.data.slice(0, 4));
        setFeaturedAlbums(albumsResponse.data.slice(0, 8));
        setGenres(genresResponse.data.slice(0, 6));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        
        // For demo purposes, set some placeholder data
        setFeaturedArtists([
          { id: 1, name: 'AC/DC' },
          { id: 2, name: 'Accept' },
          { id: 3, name: 'Aerosmith' },
          { id: 4, name: 'Alanis Morissette' }
        ]);
        
        setFeaturedAlbums([
          { id: 1, title: 'For Those About To Rock We Salute You', artist: { name: 'AC/DC' } },
          { id: 2, title: 'Balls to the Wall', artist: { name: 'Accept' } },
          { id: 3, title: 'Restless and Wild', artist: { name: 'Accept' } },
          { id: 4, title: 'Let There Be Rock', artist: { name: 'AC/DC' } }
        ]);
        
        setGenres([
          { id: 1, name: 'Rock' },
          { id: 2, name: 'Jazz' },
          { id: 3, name: 'Metal' },
          { id: 4, name: 'Alternative & Punk' },
          { id: 5, name: 'Classical' },
          { id: 6, name: 'Blues' }
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Carousel className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=New+Releases"
            alt="New Releases"
          />
          <Carousel.Caption>
            <h3>New Releases</h3>
            <p>Check out the latest music releases.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=Top+Albums"
            alt="Top Albums"
          />
          <Carousel.Caption>
            <h3>Top Albums</h3>
            <p>Discover the most popular albums.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/1200x400?text=Featured+Artists"
            alt="Featured Artists"
          />
          <Carousel.Caption>
            <h3>Featured Artists</h3>
            <p>Explore music from our featured artists.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <h2 className="mb-4">Featured Artists</h2>
      <Row className="mb-5">
        {featuredArtists.map((artist) => (
          <Col key={artist.id} md={3} sm={6} className="mb-4">
            <Card className="h-100 artist-card">
              <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${artist.name}`} />
              <Card.Body>
                <Card.Title>{artist.name}</Card.Title>
                <Button as={Link} to={`/artists/${artist.id}`} variant="primary">
                  View Artist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-4">Featured Albums</h2>
      <Row className="mb-5">
        {featuredAlbums.map((album) => (
          <Col key={album.id} md={3} sm={6} className="mb-4">
            <Card className="h-100 album-card">
              <Card.Img variant="top" src={`https://via.placeholder.com/300?text=${album.title}`} />
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>{album.artist.name}</Card.Text>
                <Button as={Link} to={`/albums/${album.id}`} variant="primary">
                  View Album
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="mb-4">Browse by Genre</h2>
      <Row>
        {genres.map((genre) => (
          <Col key={genre.id} md={2} sm={4} xs={6} className="mb-4">
            <Card className="h-100 genre-card">
              <Card.Body className="text-center">
                <Card.Title>{genre.name}</Card.Title>
                <Button as={Link} to={`/genres/${genre.id}`} variant="outline-primary" size="sm">
                  Browse
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;







































































































































