import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore ) { }

  public guardarMensaje(formContact: any, nombreColeccion: string): Promise<any>{
    return this.firestore.collection(nombreColeccion).add(formContact);
  }

  public obtenerNuevosPedidos(): Observable<any>{
      return this.firestore.collection('pedidoWeb').snapshotChanges();
  }

  public obtenerNuevosMensajes(): Observable<any>{
    return this.firestore.collection('mensajes').snapshotChanges();
  }

  public eliminarPedidos(id: string): Promise<any>{
    return this.firestore.collection('pedidoWeb').doc(id).delete();
  }

  public eliminarMensaje(id: string): Promise<any>{
    return this.firestore.collection('mensajes').doc(id).delete();
  }

}