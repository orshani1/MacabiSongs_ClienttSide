import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './components/songs/songs.component';
import { LoginComponent } from './components/login/login.component';
import { SingComponent } from './components/sing/sing.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddSongComponent } from './components/add-song/add-song.component';
import { DeleteSongComponent } from './components/delete-song/delete-song.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';

const appRoutes:Routes =[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'songs',component:SongsComponent , canActivate:[AuthGuardService]},
  {path:'songs/sing/:id',component:SingComponent,canActivate:[AuthGuardService]},
  {path:'songs/add-song',component:AddSongComponent,canActivate:[AuthGuardService]},
  {path:'songs/edit-song/:id',component:EditSongComponent,canActivate:[AuthGuardService]},
  {path:'songs/delete-song/:id',component:DeleteSongComponent,canActivate:[AuthGuardService]},
]
@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    LoginComponent,
    SingComponent,
    AddSongComponent,
    DeleteSongComponent,
    EditSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
