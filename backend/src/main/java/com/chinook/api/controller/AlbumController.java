





















































package com.chinook.api.controller;

import com.chinook.api.model.Album;
import com.chinook.api.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/albums")
@CrossOrigin(origins = "*")
public class AlbumController {

    private final AlbumService albumService;

    @Autowired
    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public ResponseEntity<List<Album>> getAllAlbums() {
        return ResponseEntity.ok(albumService.getAllAlbums());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Album> getAlbumById(@PathVariable Integer id) {
        return albumService.getAlbumById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/artist/{artistId}")
    public ResponseEntity<List<Album>> getAlbumsByArtistId(@PathVariable Integer artistId) {
        return ResponseEntity.ok(albumService.getAlbumsByArtistId(artistId));
    }
}





















































