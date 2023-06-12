import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DropboxService } from '../services/dropbox.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  depth: number = 0;
  folders: any;
  usuario: any;
  imgUser: string;
  name: string;

  constructor(public NavCtrl: NavController, public dropbox: DropboxService, public loadingCtrl: LoadingController) {}

  ngOnInit(){
    this.dropbox.setAccessToken("sl.BgKFSTALEqncKlq21aWlhrVtxIu2LeAoIP17Hd9Zb8ZlEHilz0Ty9jheBXEBH7qK1ZLKQaM7rwVqSk_Ni2iWwrKUmUMY-qxn3Dr1FsOxfEXiI1xm8O4P1zTiL0z7Ag7pbLGmhNLpU2ca");
    this.obtenerCliente();
    this.ionViewDidLoad();
  }

  obtenerCliente(){
    this.dropbox.getUserInfo().subscribe((data: any) =>{
      this.usuario = data;
      this.imgUser = this.usuario['profile_photo_url'];
      console.log(this.name = this.usuario['name']['display_name']);
    })
  }

  ionViewDidLoad(){
    this.folders = [];
    this.animacion();

    this.dropbox.getFolders().subscribe((data:any)=>{
      this.folders = data;
    }, (err) => {
      console.log(err);
    });
  }

  openFolder(path){
    this.animacion();
    this.NavCtrl.pop();
    this.dropbox.getFolders(path).subscribe((data:any)=>{
      this.folders = data;
      this.depth++;
    }, (err) => {
      console.log(err);
    });
  }

  goBack(){
    this.animacion();
    this.NavCtrl.pop();
    this.dropbox.goBackFolder().subscribe((data: any) =>{
      this.folders = data;
      this.depth--;
    }, err =>{
      console.log(err);
    });
  }

  animacion(){
    this.loadingCtrl.create({
      message: 'Sincronizando Dropbox...'
    }).then((loadingElement)=>{
      loadingElement.present();

      var ref = this;
      setTimeout(function(){
        ref.loadingCtrl.dismiss();
      }, 1500)
    });
  }

}
