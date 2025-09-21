














package com.chinook.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "media_type")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MediaType {

    @Id
    @Column(name = "media_type_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "mediaType")
    private List<Track> tracks;
}














