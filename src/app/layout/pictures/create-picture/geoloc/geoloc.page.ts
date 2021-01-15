import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

let BigDataCloudAPI = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {
  longitude: Geoposition;
  latitude: Geoposition;
  city: string;
  citySearched: string;

  constructor(private geolocation: Geolocation) {
    this.city = 'Pomme';
  }

  search(citySearched: string) {
    return `${citySearched}`;
  }

  // https://www.bigdatacloud.com/blog/convert-getcurrentposition-free-reversegeocoding-api
  getCity(x, y) {
    const Http = new XMLHttpRequest();
    const latitude = "latitude=" + x;
    const longitude = "&longitude=" + y;
    const query = latitude + longitude + "&localityLanguage=fr";
    // const bigdatacloud_api =
    //   "https://api.bigdatacloud.net/data/reverse-geocode-client?";

    BigDataCloudAPI += query;

    Http.open("GET", BigDataCloudAPI);
    Http.send();

    Http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const myObj = JSON.parse(this.responseText);
        console.log(myObj.locality);
        const city = myObj.locality;
        console.log("City:" + city);
        return city;
      }
    };
  }

  ngOnInit() {

    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);

      this.getCity(coords.latitude, coords.longitude);

      // console.log("this" + this.city);


    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

}
