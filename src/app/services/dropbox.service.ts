import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  accessToken: string;
  folderHistory: any = [];

  constructor(private http: HttpClient) { }

  setAccessToken(token){
    this.accessToken = token;
  }

  getUserInfo(){
    let url = 'https://api.dropboxapi.com/2/users/get_current_account';
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
    console.log(headers, "GetUsersInfo query");
    return this.http.post(url, "null", {headers}).pipe(map(data => data));
  }

  getFolders(path?){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });

    let folderPath;

    if(typeof (path) == "undefined" || !path){
      folderPath = {
        path: ""
      };
    }else{
      folderPath = {
        path: path
      };
      if(this.folderHistory[this.folderHistory.length -1] != path){
       this.folderHistory.push(path);
      }
    }

    return this.http.post('https://api.dropboxapi.com/2/files/list_folder', JSON.stringify(folderPath), {headers: headers}).pipe(map(data=>data['entries']));
  }

  uploadFile(path?){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({"path": "/banana.png"})

    });

    let folderPath;

    if(typeof (path) == "undefined" || !path){
      folderPath = {
        path: ""
      };
    }else{
      folderPath = {
        path: path
      };
    }

    return this.http.post('https://content.dropboxapi.com/2/files/upload', JSON.stringify(folderPath), {headers: headers}).pipe(map(data=>data['entries']));
  }

  goBackFolder(){
    if(this.folderHistory.length > 0){
      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1]

      return this.getFolders(path);
    }else{
      return this.getFolders();
    }
  }
}
