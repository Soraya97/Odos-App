import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

// import "http://maps.googleapis.com/maps/api/js?sensor=false";

@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {
  longitude: Geoposition;
  latitude: Geoposition;

  constructor(private geolocation: Geolocation) { }

  // getCity(coordinates) {
  //     var xhr = new XMLHttpRequest();
  //     var lat = coordinates[0];
  //     var lng = coordinates[1];
  //
  //     // Paste your LocationIQ token below.
  //     xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=" +
  //     lat + "&lon=" + lng + "&format=json", true);
  //     xhr.send();
  //     xhr.onreadystatechange = processRequest;
  //     xhr.addEventListener("readystatechange", processRequest, false);
  //
  //     function processRequest(e) {
  //         if (xhr.readyState == 4 && xhr.status == 200) {
  //             var response = JSON.parse(xhr.responseText);
  //             var city = response.address.city;
  //             console.log(city);
  //             return;
  //         }
  //     }
  // }

  ngOnInit() {
// https://stackoverflow.com/questions/6797569/get-city-name-using-geolocation
    // codeLatLng(lat, lng) {
    //
    //     var latlng = new google.maps.LatLng(lat, lng);
    //     geocoder.geocode({'latLng': latlng}, function(results, status) {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //       console.log(results)
    //         if (results[1]) {
    //          //formatted address
    //          alert(results[0].formatted_address)
    //         //find country name
    //              for (var i=0; i<results[0].address_components.length; i++) {
    //             for (var b=0;b<results[0].address_components[i].types.length;b++) {
    //
    //             //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
    //                 if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
    //                     //this is the object you are looking for
    //                     city= results[0].address_components[i];
    //                     break;
    //                 }
    //             }
    //         }
    //         //city data
    //         alert(city.short_name + " " + city.long_name)
    //
    //
    //         } else {
    //           alert("No results found");
    //         }
    //       } else {
    //         alert("Geocoder failed due to: " + status);
    //       }
    //     });
    //   }
    // https://www.geeksforgeeks.org/how-to-get-city-name-by-using-geolocation/
// var xhr = new XMLHttpRequest();
    this.geolocation.getCurrentPosition().then((position: Geoposition) => {
      const coords = position.coords;
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
      this.longitude = coords.longitude;
      this.latitude = coords.latitude;

      // xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=YOUR_PRIVATE_TOKEN&lat=" +
      // this.latitude + "&lon=" + this.longitude + "&format=json", true);
      // xhr.send();
      // xhr.onreadystatechange = processRequest;
      // xhr.addEventListener("readystatechange", processRequest, false);
      //
      // function processRequest(e) {
      //     if (xhr.readyState == 4 && xhr.status == 200) {
      //         var response = JSON.parse(xhr.responseText);
      //         var city = response.address.city;
      //         console.log(city);
      //         return;
      //     }
      //   }

    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }
  // codeLatLng(lat, lng);
}
