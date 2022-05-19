import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isAuthenticated:boolean = false;
  private readonly KEY = 'USERNAME';
  private readonly ADMIN_KEY = 'ADMIN';
  constructor(private service:HttpService,private router:Router) {
   }

  ngOnInit(): void {
  }
  handleGuest(){
    localStorage.clear();
    localStorage.setItem(this.KEY,"Guest");
    this.isAuthenticated = true;

    this.router.navigate(['songs']);

  }
  onSubmit(form:NgForm){

    this.service.login(form.value.username,form.value.password).subscribe((respone:any)=>{

      if(localStorage.getItem(this.KEY)){

          this.isAuthenticated = true;
          this.router.navigate(['songs']);

        
      }
        if(respone && respone[0] && respone[0]._id){
          this.isAuthenticated = true;
          localStorage.setItem(this.KEY,form.value.username);
          for(let u of respone){
            if(u.userName == form.value.username && u.isAdmin)
        localStorage.setItem(this.ADMIN_KEY,u.isAdmin);
          this.router.navigate(['songs']);
        }
        
         this.router.navigate(['songs']);
        
            
    }
    else{
      localStorage.clear();
      this.isAuthenticated = false;
  }})
  }
}
