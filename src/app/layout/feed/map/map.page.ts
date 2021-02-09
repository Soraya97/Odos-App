import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';

import { defaultIcon } from './default-marker';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';
import { City } from 'src/app/models/city';
import { GeolocationService } from 'src/app/services/geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;
  pictures: Picture;
  long: number;
  lat: number;
  city: City;
  locations: {long: number, lat: number}[]

  constructor(private pictureService: PictureService, private geolocationService: GeolocationService) {
    this.locations = [
      {
        long: 48.862725,
        lat: 2.287592
      },
      {
        long: 50,
        lat: 2.287592
      }
    ]

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 2,
      center: latLng(48.862725, 2.287592)
    };

    this.pictureService.getAllPictures().subscribe(picture => {

      this.pictures = picture;

      // for (let i = 0; i <= 3; i++) {
      //   console.log(i);
        this.long = this.pictures[2].location.coordinates[0];
        this.lat = this.pictures[2].location.coordinates[1];
      // }

      this.geolocationService.getCity(this.long, this.lat).subscribe(city => {
        this.city = city.locality;
        console.log(city);

        // for (let i = 0; i < 2; i++) {
        //  marker([this.pictures[i].location.coordinates[0], this.pictures[i].location.coordinates[1]], { icon: defaultIcon }).addTo(this.mapMarkers);
        // }

        this.mapMarkers = [
          marker([this.locations[0].long, this.locations[0].lat], { icon: defaultIcon }).bindPopup(`${this.city}`),
          marker([this.locations[1].long, this.locations[1].lat], { icon: defaultIcon }).bindPopup(`${this.city}`)
        ];

      }), err => {
        console.warn(err);
        alert(err.message);
      }

    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

  ngOnInit() {



  }

  onMapReady(map: Map) {
    setTimeout(() => map.invalidateSize(), 0);
    this.map = map;

    // this.map.on('moveend', () => {
    //   const center = this.map.getCenter();
    //   console.log(`Map moved to ${center.lng}, ${center.lat}`);
    // });
  }

}
