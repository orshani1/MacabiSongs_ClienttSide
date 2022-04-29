import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy {

  constructor(private http:HttpService){

  }
  ngOnDestroy(): void {
    localStorage.clear();

  }

  ngOnInit(): void {
 
  }
  title = 'app';

 
}
