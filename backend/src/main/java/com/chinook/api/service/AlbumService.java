




































package com.chinook.api.service;

import com.chinook.api.model.Album;
import com.chinook.api.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;

    @Autowired
    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    public Optional<Album> getAlbumById(Integer id) {
        return albumRepository.findById(id);
    }

    public List<Album> getAlbumsByArtistId(Integer artistId) {
        return albumRepository.findByArtistId(artistId);
    }
}




































