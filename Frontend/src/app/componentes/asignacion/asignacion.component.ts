import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export class AsignacionComponent implements OnInit {

  constructor(private peticion: PeticionService) { }

      ngOnInit(): void {
      this.CargarTodos()
      this.CargarApis()
      this.CargarRoles()
    }
  
    path: string = ""
    permiso: string = "Si"
    nombrerol: string = ""
    idseleccionado: string = ""
    datos: any[] = []
    datosApis: any[] = []
    datosRoles: any[] = []
  
    Nuevo() {
      this.idseleccionado = ""
      this.path = ""
      this.permiso = "Si"
      this.nombrerol = ""
      $('#nuevoregistro').modal('show')
    }
  
  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/asignacion/cargarTodos",
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
        path: "/asignacion/Guardar",
        payload: {
          path: this.path,
          permiso: this.permiso,
          nombrerol: this.nombrerol
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
        path: "/asignacion/CargarId/" + _id,
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
            this.path = lista[0].path
            this.permiso = lista[0].permiso
            this.nombrerol = lista[0].nombrerol
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
        path: "/asignacion/Actualizar",
        payload: {
          _id: this.idseleccionado,
          permiso: this.permiso,
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
        path: "/asignacion/Eliminar",
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

    CargarApis() {
      var post = {
        host: this.peticion.dominio,
        path: "/apis/cargarTodos",
        payload: {
        }
      }
  
      this.peticion.Get(post.host + post.path).subscribe((res: any) => {
        this.datosApis = res
      })
    }

    CargarRoles() {
      var post = {
        host: this.peticion.dominio,
        path: "/roles/cargarTodos",
        payload: {
        }
      }
  
      this.peticion.Get(post.host + post.path).subscribe((res: any) => {
        this.datosRoles = res
      })
    }
}
