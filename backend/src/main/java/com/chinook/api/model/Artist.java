



package com.chinook.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "artist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artist {

    @Id
    @Column(name = "artist_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "artist")
    private List<Album> albums;
}



