import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../services/peticion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var $: any
declare var Notiflix: any

@Component({
  selector: 'app-misdirecciones',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './misdirecciones.component.html',
  styleUrl: './misdirecciones.component.css'
})
export class MisdireccionesComponent implements OnInit {

  datosDirecciones: any[] = [];

  constructor(private peticion: PeticionService) { }

  ngOnInit(): void {
    this.CargarTodasDirecciones();
  }


  codigo: string = ""
  departamento: string = ""
  municipio: string = ""
  codigopostal: string = ""
  alias: string = ""
  direccion: string = ""
  idseleccionado: string = ""
  datos: any[] = []

  Nuevo() {
    this.idseleccionado = ""
    this.codigo = ""
    this.departamento = ""
    this.municipio = ""
    this.codigopostal = ""
    this.alias = ""
    this.direccion = ""
    $('#nuevoregistro').modal('show')
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

  Guardar() {
    var post = {
      host: this.peticion.dominio,
      path: "/misdirecciones/Guardar",
      payload: {
        codigo: this.codigo,
        departamento: this.departamento,
        municipio: this.municipio,
        codigopostal: this.codigopostal,
        alias: this.alias,
        direccion: this.direccion,
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje)
        this.CargarTodasDirecciones();
        $('#nuevoregistro').modal('hide')
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }

  Editar(_id: string) {
    this.idseleccionado = _id
    var post = {
      host: this.peticion.dominio,
      path: "/misdirecciones/CargarId/" + _id,
      payload: {
      }
    }
    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : (res != null && Array.isArray(res.data) ? res.data : [])

        if (lista.length > 0) {
          this.codigo = lista[0].codigo
          this.departamento = lista[0].departamento
          this.municipio = lista[0].municipio
          this.codigopostal = lista[0].codigopostal
          this.alias = lista[0].alias
          this.direccion = lista[0].direccion
          $('#nuevoregistro').modal('show')
        }
        else {
          Notiflix.Notify.failure("Puede que el registro fuera eliminado")
        }
      },
      error: () => {
        Notiflix.Notify.failure("No se pudo cargar la dirección")
      }
    })
  }

  Actualizar() {
    var post = {
      host: this.peticion.dominio,
      path: "/misdirecciones/Actualizar",
      payload: {
        _id: this.idseleccionado,
        departamento: this.departamento,
        municipio: this.municipio,
        codigopostal: this.codigopostal,
        alias: this.alias,
        direccion: this.direccion,
      }
    }
    this.peticion.Put(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodasDirecciones();
      }
    })
  }

  Eliminar() {
    var post = {
      host: this.peticion.dominio,
      path: "/misdirecciones/Eliminar",
      payload: {
        _id: this.idseleccionado
      }
    }
    this.peticion.Delete(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodasDirecciones();
      }
    })
  }
}
