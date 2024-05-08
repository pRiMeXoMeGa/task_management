import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router:Router) { }

  isSideNav:boolean=false
  public setSideNav(b:boolean){
    this.isSideNav=b;
  }
  public getsideNav():boolean{
    return this.isSideNav;
  }

  public setToken(token:any){
    localStorage.setItem("token", token.access_token);
    localStorage.setItem("token_type", token.token_type);
    localStorage.setItem("user", token.user.email);
    localStorage.setItem("id", token.user.id);
    localStorage.setItem("username", token.user.fullname);
  }

  public getToken():any{
    return {"token":localStorage.getItem("token"), 
            "token_type":localStorage.getItem("token_type"),
            "user":localStorage.getItem("user"),
            "id":localStorage.getItem("id"),
            "username":localStorage.getItem("username")
          }
  }

  public isLoggedIn(){
    return this.getToken() && (0==0);
  }

  public logout(){
    localStorage.clear();
    this.setSideNav(false);
    this.router.navigate(['/login']);
  }

  public destroy(sub:Subscription){
    sub.unsubscribe();
  }
}
