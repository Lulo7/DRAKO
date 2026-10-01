import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {

  constructor(private peticion: PeticionService) { }

  ngOnInit(): void {
    this.CargarTodos()
  }

  code: string = ""
  nombre: string = ""
  estado: string = "Activo"
  idseleccionado: string = ""
  datos: any[] = []

  Nuevo() {
    this.idseleccionado = ""
    this.code = ""
    this.nombre = ""
    this.estado = "Activo"
    $('#nuevoregistro').modal('show')
  }

  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/roles/cargarTodos",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
        this.datos = Array.isArray(res) ? res : []
      },
      error: () => {
        this.datos = []
      }
    })
  }

  Guardar() {
    var post = {
      host: this.peticion.dominio,
      path: "/roles/Guardar",
      payload: {
        code: this.code,
        nombre: this.nombre,
        estado: this.estado
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje)
        this.CargarTodos()
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
      path: "/roles/CargarId/" + _id,
      payload: {
      }
    }
    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
        if (res != null && res.state == false) {
          Notiflix.Notify.failure(res.mensaje)
          return
        }

        const lista = Array.isArray(res) ? res : []

        if (lista.length > 0) {
          this.code = lista[0].code
          this.nombre = lista[0].nombre
          this.estado = lista[0].estado
          $('#nuevoregistro').modal('show')
        }
        else {
          Notiflix.Notify.failure("Puede que el registro fuera eliminado")
        }
      },
      error: () => {
        Notiflix.Notify.failure("No se pudo cargar el registro")
      }
    })
  }

  Actualizar() {
    var post = {
      host: this.peticion.dominio,
      path: "/roles/Actualizar",
      payload: {
        _id: this.idseleccionado,
        nombre: this.nombre,
        estado: this.estado
      }
    }
    this.peticion.Put(post.host + post.path, post.payload).subscribe((res: any) => {
      if(res.state == false){
        Notiflix.Notify.failure(res.mensaje)
      }
      else{
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodos()
      }
    })
  }

  Eliminar() {
    var post = {
      host: this.peticion.dominio,
      path: "/roles/Eliminar",
      payload: {
        _id: this.idseleccionado
      }
    }
    this.peticion.Delete(post.host + post.path, post.payload).subscribe((res: any) => {
      if(res.state == false){
        Notiflix.Notify.failure(res.mensaje)
      }
      else{
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodos()
      }
    })
  }
}
