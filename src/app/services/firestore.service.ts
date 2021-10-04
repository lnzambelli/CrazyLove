import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore ) { }

  public guardarMensaje(formContact: any, nombreColeccion: string): Promise<any>{
    return this.firestore.collection(nombreColeccion).add(formContact);
  }
}
