import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  song:any = {}
  id:number = 0;
  subWords:string = '';
  constructor(private aRoute:ActivatedRoute,private service:HttpService,private router:Router) { 
      this.aRoute.params.subscribe((params:Params)=>{
            this.id = params['id'];
      });
      this.service.getSingleSong(this.id).subscribe((params:Params)=>{
        this.song = params;
      })
      console.log('song',this.song);
      
  }

  ngOnInit(): void {
  }
  handleSubmit(form:NgForm){
    this.song = form.value;
    for(let i =0;i<=40;i++){

      this.subWords += form.value.words[i].toString();
    }
    this.song.subWords = this.subWords;
   this.service.updateSong(this.id,this.song).subscribe((params:any)=>{
      this.router.navigate(['songs']);
   })
  }
}
