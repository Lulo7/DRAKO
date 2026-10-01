import { Injectable } from '@angular/core';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private peticion: PeticionService) { }

  listacarrito: any[] = []
  subtotal:number = 0
  descuentos:number = 0
  grantotal:number = 0

  Load() {

    var idtracking = localStorage.getItem("idtracking")

    if (idtracking != undefined && idtracking != null) {
      var post = {
        host: this.peticion.dominio,
        path: "/carritos/MiCarrito/" + idtracking,
        payload: {
          idtracking: idtracking
        }
      }

      this.peticion.Post(post.host + post.path, post.payload).subscribe({
        next: (res: any) => {
          if (!Array.isArray(res)) {
            this.listacarrito = []
            this.subtotal = 0
            this.descuentos = 0
            this.grantotal = 0
            return
          }

          this.listacarrito = res
          this.subtotal = res.reduce((acumulador:number, item:any) => acumulador = acumulador + (item.precio * item.cantidad), 0)
          this.descuentos = res.reduce((acumulador:number, item:any) => acumulador = acumulador + (item.precio * item.descuento / 100) * item.cantidad, 0)
          this.grantotal = this.subtotal - this.descuentos
        },
        error: () => {
          this.listacarrito = []
          this.subtotal = 0
          this.descuentos = 0
          this.grantotal = 0
        }
      })
    }
  }
}
