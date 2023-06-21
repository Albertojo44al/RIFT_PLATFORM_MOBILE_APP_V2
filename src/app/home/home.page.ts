import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DropboxService } from '../services/dropbox.service';
import {FileChooser} from '@ionic-native/file-chooser/ngx'
import {FilePath} from '@ionic-native/file-path/ngx'

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
  returnPath: string="";

  constructor(public NavCtrl: NavController, public dropbox: DropboxService, public loadingCtrl: LoadingController, public fileChooser: FileChooser, public filePath: FilePath) {}

  ngOnInit(){
    this.dropbox.setAccessToken("sl.BguNaoogS_0dxjX-XFuDWB6JhPEJp7NR6n05KOC-5Aqluyxpk7qo8Fg1JaBDt6HklTloSExkvPyGlcGSvZDcYZlKhICN8R6tzuq_2TdgC8k6vTnB9bVwcZkPx8ycdyQuUXD8MsMsWNuB");
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
      console.log(this.folders)
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

  pickFile(){
    this.fileChooser.open().then((fileuri)=>{
      this.filePath.resolveNativePath(fileuri).then(
        (resolvedNativePath)=>{
          this.returnPath = resolvedNativePath;
        }
      )
    })
    
    this.animacion();
    this.dropbox.uploadFile(this.returnPath).subscribe((data:any)=>{
      
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
