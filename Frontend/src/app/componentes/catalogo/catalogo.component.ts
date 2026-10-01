import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PeticionService } from '../../services/peticion.service';
import { CarritoService } from '../../services/carrito.service';

declare var Notiflix: any

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

  datos: any[] = [];
  busqueda: string = '';
  marcaSeleccionada: string = 'Todas';
  cargando: boolean = true;
  errorCarga: boolean = false;
  unidadescompra: number = 1


  constructor(public peticion: PeticionService, private carrito: CarritoService) { }

  ngOnInit(): void {
    this.CargarTodos();
  }

  CargarTodos(): void {
    this.cargando = true;
    this.errorCarga = false;

    const url = this.peticion.dominio + '/productos/cargarTodos';

    this.peticion.Get(url).subscribe({
      next: (res: any) => {
        this.datos = Array.isArray(res) ? res : [];
        this.cargando = false;
      },
      error: () => {
        this.datos = [];
        this.errorCarga = true;
        this.cargando = false;
      }
    });
  }

  get marcas(): string[] {
    const nombres = this.datos
      .map((producto: any) => producto.marca)
      .filter((marca: any) => typeof marca === 'string' && marca.trim() !== '');

    return ['Todas', ...Array.from(new Set(nombres)).sort()];
  }

  get productosFiltrados(): any[] {
    const texto = this.busqueda.trim().toLowerCase();

    return this.datos.filter((producto: any) => {
      const coincideMarca =
        this.marcaSeleccionada === 'Todas' ||
        producto.marca === this.marcaSeleccionada;

      const coincideBusqueda =
        !texto ||
        [
          producto.nombre,
          producto.marca,
          producto.codigo,
          producto.descripcion,
          producto.departamento
        ].some((valor: any) =>
          String(valor || '').toLowerCase().includes(texto)
        );

      return coincideMarca && coincideBusqueda;
    });
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.marcaSeleccionada = 'Todas';
  }

  random = Date.now();

  imagenNoDisponible(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/default.png';
  }

  AddCar(idProductoo: string) {
    var post = {
      host: this.peticion.dominio,
      path: "/carritos/Guardar",
      payload: {
        idproducto: idProductoo,
        cantidad: this.unidadescompra,
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