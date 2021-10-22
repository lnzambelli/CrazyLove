import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthViewListService {

    public estado: boolean =false
    public estado$: Subject<boolean> = new Subject();

  constructor() { }

  public obtenerEstado(): Observable<boolean>{
    return this.estado$.asObservable();
  }

  public devolverEstado(){
    this.estado$.next(this.estado);
  }
}
