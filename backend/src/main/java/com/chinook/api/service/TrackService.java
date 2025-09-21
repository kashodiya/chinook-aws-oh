








































package com.chinook.api.service;

import com.chinook.api.model.Track;
import com.chinook.api.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrackService {

    private final TrackRepository trackRepository;

    @Autowired
    public TrackService(TrackRepository trackRepository) {
        this.trackRepository = trackRepository;
    }

    public List<Track> getAllTracks() {
        return trackRepository.findAll();
    }

    public Optional<Track> getTrackById(Integer id) {
        return trackRepository.findById(id);
    }

    public List<Track> getTracksByAlbumId(Integer albumId) {
        return trackRepository.findByAlbumId(albumId);
    }

    public List<Track> getTracksByGenreId(Integer genreId) {
        return trackRepository.findByGenreId(genreId);
    }
}








































