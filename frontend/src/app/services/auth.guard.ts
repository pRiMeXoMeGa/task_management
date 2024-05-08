import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private utilsService:UtilsService,
              private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.utilsService.getToken().token!==null){
      this.utilsService.setSideNav(true);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
