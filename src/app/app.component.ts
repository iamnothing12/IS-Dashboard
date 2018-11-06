import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title:'Dashboard', 
      url:'/Dashboard',
      icon: 'home'
    },
    {
      title:'Profile', 
      url:'/profile',
      icon: 'contact'
    },
    {
      title:'New Race', 
      url:'/selectionpage',
      icon: 'walk'
    },
    {
      title:'Logout', 
      url:'/login',
      icon: 'exit'
    }


  ]

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
