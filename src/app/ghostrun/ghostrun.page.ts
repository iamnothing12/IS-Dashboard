import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { GoogleMaps, GoogleMap, Environment } from '@ionic-native/google-maps/ngx'

@Component({
  selector: 'app-ghostrun',
  templateUrl: './ghostrun.page.html',
  styleUrls: ['./ghostrun.page.scss'],
})
export class GhostrunPage implements OnInit {

  map: GoogleMap;
  constructor(private platform:Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': '',
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });

    this.map = GoogleMaps.create('map_canvas');
  }
}
