
























package com.chinook.api.repository;

import com.chinook.api.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Integer> {
    List<Track> findByAlbumId(Integer albumId);
    List<Track> findByGenreId(Integer genreId);
}
























