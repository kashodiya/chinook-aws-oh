











package com.chinook.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "genre")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Genre {

    @Id
    @Column(name = "genre_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "genre")
    private List<Track> tracks;
}











