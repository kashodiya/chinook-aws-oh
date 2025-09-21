








package com.chinook.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "track")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Track {

    @Id
    @Column(name = "track_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;

    @ManyToOne
    @JoinColumn(name = "media_type_id")
    private MediaType mediaType;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @Column(name = "composer")
    private String composer;

    @Column(name = "milliseconds")
    private Integer milliseconds;

    @Column(name = "bytes")
    private Integer bytes;

    @Column(name = "unit_price")
    private BigDecimal unitPrice;
}








