






























































package com.chinook.api.controller;

import com.chinook.api.model.Track;
import com.chinook.api.service.TrackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tracks")
@CrossOrigin(origins = "*")
public class TrackController {

    private final TrackService trackService;

    @Autowired
    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @GetMapping
    public ResponseEntity<List<Track>> getAllTracks() {
        return ResponseEntity.ok(trackService.getAllTracks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Track> getTrackById(@PathVariable Integer id) {
        return trackService.getTrackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/album/{albumId}")
    public ResponseEntity<List<Track>> getTracksByAlbumId(@PathVariable Integer albumId) {
        return ResponseEntity.ok(trackService.getTracksByAlbumId(albumId));
    }

    @GetMapping("/genre/{genreId}")
    public ResponseEntity<List<Track>> getTracksByGenreId(@PathVariable Integer genreId) {
        return ResponseEntity.ok(trackService.getTracksByGenreId(genreId));
    }
}






























































