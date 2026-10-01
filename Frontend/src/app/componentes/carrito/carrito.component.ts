import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { PeticionService } from '../../services/peticion.service';
import { Router, RouterLink } from '@angular/router';

declare var Notiflix: any

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  constructor(public carrito: CarritoService, public peticion: PeticionService, private route: Router) { }

  ngOnInit(): void {

  }

  ModificarCantidad(idproducto: string, mov: number, cantidad: number, _id: string) {

    const nuevacantidad = Number(cantidad) + mov

    if (nuevacantidad < 1) {
      Notiflix.Confirm.show(
        'DRAKO',
        'Desea Eliminar el item del carrito?',
        'Si',
        'No',
        () => {
          this.Eliminar(_id)
        },
        function canceltb() {
          console.log("Dijo que no")
        },
        {
          width: '470px',
          borderRadius: '8px'
        }
      );
    }
    else {
      var post = {
        host: this.peticion.dominio,
        path: "/carritos/Guardar",
        payload: {
          idproducto: idproducto,
          cantidad: nuevacantidad,
          idtracking: localStorage.getItem("idtracking")
        }
      }
      this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
        if (res.state == true) {
          Notiflix.Notify.success(res.mensaje)
          this.carrito.Load()
        }
        else {
          Notiflix.Notify.failure(res.mensaje)
        }
      })
    }

  }

  Eliminar(id: string) {
    var post = {
      host: this.peticion.dominio,
      path: "/carritos/Eliminar",
      payload: {
        _id: id
      }
    }
    this.peticion.Delete(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje)
        this.carrito.Load()
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }

  VerificarLogin() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/Estado",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      if (res.nombre != undefined && res.nombre != null) {
        this.route.navigate(["checkout"])
      }
      else {
        Notiflix.Notify.failure("Debe iniciar sesion para seleccionar su direccion")
        this.route.navigate(["login"])
      }
    })
  }

  random = Date.now();

  imagenNoDisponible(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/default.png';
  }
}
