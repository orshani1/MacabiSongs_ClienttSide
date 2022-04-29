import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {
  songs:any = {}
  addedSong:any ={}
  error:string = 'השיר שאתה מנסה להוסיף כבר נמצא במערכת שים לב';
  isError:boolean = false;
  constructor(private http:HttpService,private router:Router) {
    http.getAllSongs().subscribe((params:any)=>{
      this.songs = params;
      console.log(this.songs);
    })
   }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
 

    this.addedSong = form.value;
    let words:string = "";
    for(let i =0;i<=20;i++){

      words += form.value.words[i];
    }
    this.addedSong.subWords = `${words} ...`;
    this.http.postSong(this.addedSong).subscribe((Response:any)=>{
      this.router.navigate(['songs']);
    })
  }
}
