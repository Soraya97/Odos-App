import { Component, OnInit } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})

export class MapPage implements OnInit {
  mapOptions: MapOptions;

  constructor() {
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

  }

  ngOnInit() {

  }

  // onMapReady(map: Map) {
  //   setTimeout(() => map.invalidateSize(), 0);
  // }

}
