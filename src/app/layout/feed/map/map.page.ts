import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer, Map, marker, Marker } from 'leaflet';

import { defaultIcon } from './default-marker';
import { Picture } from 'src/app/models/pictures';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  map: Map;
  picture: Picture;
  location: { long: number, lat: number }[];

  constructor(private pictureService: PictureService) {
    this.location = [{
      long: 46.778186, lat: 6.641524
    },
    {
      long: 46.7782, lat: 6.65
    }]

    this.mapOptions = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { maxZoom: 18 }
        )
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
    // for (var i = 0; i < this.location.length; i++) {
      this.mapMarkers = [
        marker([this.location[0].long, this.location[0].lat], { icon: defaultIcon }).bindTooltip('Hello')
      ];
    // }
  }

  ngOnInit() {

    this.pictureService.getPicture().subscribe(picture => {
      this.picture = picture;
    }, err => {
      console.warn(err);
      alert(err.message);
    });

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
