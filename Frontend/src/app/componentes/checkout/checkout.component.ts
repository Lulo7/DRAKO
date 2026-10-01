import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { PeticionService } from '../../services/peticion.service';
import { CarritoService } from '../../services/carrito.service';

declare var $: any;
declare var Notiflix: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  codigo: string = '';
  departamento: string = '';
  municipio: string = '';
  codigopostal: string = '';
  alias: string = '';
  direccion: string = '';
  idseleccionado: string = '';

  datosDirecciones: any[] = [];

  constructor(
    public peticion: PeticionService,
    public carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.CargarTodasDirecciones();
    this.carritoService.Load();
  }

  CargarTodasDirecciones(): void {
    const url = this.peticion.dominio + '/misdirecciones/CargarTodos';

    this.peticion.Get(url).subscribe({
      next: (res: any) => {
        this.datosDirecciones = Array.isArray(res) ? res : [];
      },
      error: () => {
        this.datosDirecciones = [];
        Notiflix.Notify.failure('No fue posible cargar tus direcciones.');
      }
    });
  }

  Nuevo(): void {
    this.codigo = '';
    this.departamento = '';
    this.municipio = '';
    this.codigopostal = '';
    this.alias = '';
    this.direccion = '';

    $('#nuevoregistro').modal('show');
  }

  Guardar(): void {
    const post = {
      codigo: this.codigo,
      departamento: this.departamento,
      municipio: this.municipio,
      codigopostal: this.codigopostal,
      alias: this.alias,
      direccion: this.direccion
    };

    this.peticion.Post(
      this.peticion.dominio + '/misdirecciones/Guardar',
      post
    ).subscribe({
      next: (res: any) => {
        if (res.state === true) {
          Notiflix.Notify.success(res.mensaje);
          this.CargarTodasDirecciones();
          $('#nuevoregistro').modal('hide');
        } else {
          Notiflix.Notify.failure(res.mensaje || 'No se pudo guardar la dirección.');
        }
      },
      error: () => {
        Notiflix.Notify.failure('Ocurrió un error al guardar la dirección.');
      }
    });
  }

  Comprar(): void {

  }
}