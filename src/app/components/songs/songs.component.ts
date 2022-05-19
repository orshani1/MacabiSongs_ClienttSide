import { Component, ElementRef, Inject, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { interval } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { DOCUMENT } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit , OnDestroy {
  scrollVal:any;
  //for song details
  songs: any = {};
  id: number = 0;
  //for user details
  user = {};
  isAdmin: boolean = false;
///for song state
  isSelected: boolean = false;
  selcetedSong:any = {};
  message:string = '';
  ////for quotes
  quotes:any = {};
  
  constructor(
    private service: HttpService,
    @Inject(DOCUMENT)document:Document,
    
 
  ) {
    if (localStorage.getItem('ADMIN') === 'true') {   /////CHECKING IF THE USER IS AUTHORIZE
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    service.getAllSongs().subscribe((params: Params) => {/////////Getting all the songs from server and assign them to songs object
      this.songs = params;
      console.log("params =",params)
      console.log("this songs  =",this.songs)
      
    });


    /////Check every 2 seconds if isSelected is change and if so change the song state in the UI
      interval(2000).subscribe(x=>{
          service.getAllSongs().subscribe((response:any)=>{
            console.log("In interval response is ",response);
            let count = 0;
            for(let song of response){
                if(song.isSelected){
                    count++;
                    console.log("Selected song is ",song);
                    this.selcetedSong = song;
                }
            }
            if(count >= 1){
              this.isSelected = true;
              
            }
            else{
              this.isSelected= false;
            }
          })
        });
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.service.getSingleUser(this.id).subscribe((res: any) => { ///getting the user 
      this.user = res;
      console.log('API CALL',res);
      console.log('user is ', this.user);
    });

 
  }

  viewSing(){
    document.getElementById('selected-card')?.scrollIntoView({block:'end',behavior:'smooth'});
    
  }

  handleClick(id: number) {
    console.log('ENTERING HANDLE CLICK SONGD ID IS ',id)
      this.service.getSingleSong(id).subscribe((params:any)=>{
        
        console.log('PARAMS ARE ',params)
        this.isSelected = true;
        params.isSelected = true;
        this.selcetedSong = params;
        this.service.updateSong(params._id,params).subscribe((params:any)=>{
          console.log('updated song in db is  the id of the song is ',params,params._id);
        });        
      })
  }

  }

