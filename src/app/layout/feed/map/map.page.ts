import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';

import { defaultIcon } from './default-marker';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';
import { City } from 'src/app/models/city';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { FeedService } from 'src/app/services/feed.service';

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

  constructor(private feedService: FeedService, private geolocationService: GeolocationService) {

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

    this.feedService.getAllPictures().subscribe(picture => {

      this.pictures = picture;
      // console.log(this.pictures[0].location.coordinates[0]);


      // for (let i = 0; i <= 3; i++) {
      //   console.log(i);
      this.long = this.pictures[0].location.coordinates[0];
      this.lat = this.pictures[0].location.coordinates[1];
      // }

      this.geolocationService.getCity(this.long, this.lat).subscribe(city => {
        this.city = city.locality;
        console.log(city);

        for (let i = 0; i < 2; i++) {
          // this.mapMarkers[i] = marker([this.pictures[i].location.coordinates[0], this.pictures[i].location.coordinates[1]], { icon: defaultIcon });
          // marker([this.pictures[i].location.coordinates[0], this.pictures[i].location.coordinates[1]], { icon: defaultIcon }).addTo(this.mapMarkers);
        }

        this.mapMarkers = [
          marker([this.pictures[0].location.coordinates[0], this.pictures[0].location.coordinates[1]], { icon: defaultIcon }).bindPopup(`${this.city}`),
          marker([this.pictures[2].location.coordinates[0], this.pictures[2].location.coordinates[1]], { icon: defaultIcon }).bindPopup(`${this.city}`),
          marker([this.pictures[8].location.coordinates[0], this.pictures[8].location.coordinates[1]], { icon: defaultIcon }).bindPopup(`${this.city}`)
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
