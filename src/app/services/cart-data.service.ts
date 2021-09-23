import { Producto } from './../components/dashboard/productos';
import { Observable } from 'rxjs';
import { Card } from './../components/dashboard/card';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CartDataService {

    public data!: Card
    public dataTable: Array<Card> =[];
    public dataTableProd: Array<Producto> =[];
    resultado: number =0;
    totalLineas:number = 0;

    public obtenerDatos(card: Card){
        const existePord = this.dataTableProd.find(product => product.nombre === card.producto);
        if (!existePord) {
          const prod = new Producto(card.producto, parseInt(card.precio), 1, parseInt(card.precio))
          this.dataTableProd.push(prod)
        }else{
            this.dataTableProd.forEach(function(prod){
                if (prod.nombre ===card.producto){
                  prod.cantidad+=1;
                  prod.total=prod.precio*prod.cantidad;
                }
            })
        }
        this.resultado= this.obtenerResultado();
    }

    public enviarDatoATabla(){
        return this.dataTableProd;
    }

    public actualizarTabla(nombre: string){
      this.dataTableProd = this.dataTableProd.filter(prod => prod.nombre !== nombre)
      this.resultado= this.obtenerResultado();
    }

    public obtenerResultado(): number{
      let total = 0;
      this.dataTableProd.forEach(product => {
      total= total + (product.cantidad*product.precio)
       });
       return total
   }

   public enviarResultado(): number{
     return this.resultado
   }

   public enviarCantidadProductos(): number{
      return this.totalLineas
   }
}
