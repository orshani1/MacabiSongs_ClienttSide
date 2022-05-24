import { Injectable } from '@angular/core';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly SERVER ='https://macabisongsapi20220523232622.azurewebsites.net/api';
  constructor(private _http:HttpClient) {
       
   }

   ///GET
   getAllSongs(){
     return this._http.get(`${this.SERVER}/songs`);
   }
   getAllUsers(){
     return this._http.get(`${this.SERVER}/user`);
   }
   


///CLASS UTILITES
   login(username:string,password:string){
     let httpOptions = {
       params:{
          username,
          password
       }
     }
     return this._http.get(`${this.SERVER}/user`,httpOptions);
   }
   public isAuthenticated():boolean{
     const username = localStorage.getItem('USERNAME');
     return (username !== null);
   }
///GET SINGLE BY ID
   getSingleUser(id:number){
    return  this._http.get(`${this.SERVER}/user/${id}`);
   }
   getSingleSong(id:number){

      return this._http.get(`${this.SERVER}/songs/${id}`);
   }


   ///POST 
   postSong(song:any){
      return this._http.post(`${this.SERVER}/songs`,song);
   }


   ///DELETE
   deleteSong(id:number){
      return this._http.delete(`${this.SERVER}/songs/${id}`);
   }


   //PUT 
   updateSong(id:number,song:any){
     return this._http.patch(`${this.SERVER}/songs/${id}`,song);
   }
}
