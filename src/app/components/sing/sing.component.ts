import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { DomSanitizer } from '@angular/platform-browser';
import { interval } from 'rxjs';

@Component({
  selector: 'app-sing',
  templateUrl: './sing.component.html',
  styleUrls: ['./sing.component.css'],
})
export class SingComponent implements OnInit {
  id: number = 0;
  words: string = '';
  isAdmin: boolean = false;
  videoURL: any =
    'https://www.youtube.com/watch?v=wGVhvLVvJDs&ab_channel=MaccabiTelAvivnumberone';
  safeURL: any = '';
  song: any = {};
  constructor(
    private aRoute: ActivatedRoute,
    private service: HttpService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {
  
    this.aRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    if (localStorage.getItem('ADMIN') === 'true') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  ngOnInit(): void {
    this.service.getSingleSong(this.id).subscribe((params: Params) => {
      this.song = params;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/watch?v=wGVhvLVvJDs&ab_channel=MaccabiTelAvivnumberone'
      );
    });
    console.log('SONG VIDEO PROP IS', this.song.video);
  }
  handleClick() {
    this.song.isSelected = false;
    this.service.updateSong(this.id, this.song).subscribe((params: any) => {
      console.log()
      this.router.navigate(['songs']);
    });
  }



  }
