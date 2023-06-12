import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user:any; 

  constructor() {
    let tempUser = localStorage.getItem("userData");
    this.user = JSON.parse(tempUser);
  }

}
