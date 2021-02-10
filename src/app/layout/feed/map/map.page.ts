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
  pictures: Picture[];
  long: number;
  lat: number;
  city: City;

  constructor(private feedService: FeedService, private geolocationService: GeolocationService) {
    this.mapMarkers = [];
    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 2,
      // TODO: Center on the place where the photo was taken or where the user is
      center: latLng(48.862725, 2.287592)
    };

    this.feedService.getAllPictures().subscribe(picture => {

      this.pictures = picture;

      for (const picture of this.pictures) {
        const newMarker = marker(picture.location.coordinates, { icon: defaultIcon }).bindPopup(picture.description);
        this.mapMarkers.push(newMarker);
      }


    }, err => {
      console.warn(err);
      alert(err.message);
    });

  }

  ngOnInit() {
    this.geolocationService.getGeolocation().then((coords: Coordinates) => {
      this.lat = coords.latitude;
      this.long = coords.longitude;
    })
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
