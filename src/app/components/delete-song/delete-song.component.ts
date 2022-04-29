import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.css']
})
export class DeleteSongComponent implements OnInit {
  id:number = 0;
  isDeleted:boolean = false;
  constructor(private aRoute:ActivatedRoute,private service:HttpService) {
        aRoute.params.subscribe((params:any)=>{
            this.id = params['id'];
        })  
       }

  ngOnInit(): void {
  }
  handleDelete(){
      this.service.deleteSong(this.id).subscribe((res:any)=>{
              this.isDeleted = true;
      })
  }
}
