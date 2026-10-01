import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarritoService } from '../../services/carrito.service';
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuAbierto = false;
  logueado = false;

  ngOnInit() {
    this.carrito.Load()
    this.VerificarSesion()
  }

  constructor(private carrito: CarritoService, private peticion: PeticionService){}

  VerificarSesion() {
    this.peticion.Get(this.peticion.dominio + "/usuarios/Estado").subscribe({
      next: (res: any) => {
        this.logueado = res != null && res.nombre != undefined && res.nombre != null
      },
      error: () => {
        this.logueado = false
      }
    })
  }

  cerrarMenu(): void {
  this.menuAbierto = false;
  }
}
