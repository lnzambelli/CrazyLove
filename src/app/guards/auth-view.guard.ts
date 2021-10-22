import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthViewListService} from '../services/auth-view-list.service'

@Injectable({
  providedIn: 'root'
})
export class AuthViewGuard implements CanActivate {

  estado: boolean = false;
  
  constructor(private authView: AuthViewListService ){
    this.authView.obtenerEstado().subscribe(val =>{
      this.estado=val;
    })
  }

  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this.estado;
  }
  
}
