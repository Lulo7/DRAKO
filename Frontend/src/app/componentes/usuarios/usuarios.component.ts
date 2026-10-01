import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var $: any
declare var Notiflix: any


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MenulateralComponent, CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  constructor(public peticion: PeticionService) { }
  datos: any[] = []
  datosRoles: any[] = []

  nombre: string = ""
  email: string = ""
  password: string = ""
  nombrerol: string = ""
  idseleccionado: string = ""
  activa: String = ""


  ngOnInit(): void {
    this.CargarTodos()
    this.CargarRoles()
  }

  Nuevo() {
    this.nombre = ""
    this.email = ""
    this.password = ""
    this.nombrerol = ""
    this.idseleccionado = ""
    this.activa = "Si"
    $('#nuevoregistro').modal('show')
  }

  Guardar() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/Guardar",
      payload: {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        nombrerol: this.nombrerol
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      this.datos = res
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodos()
      }
    })
  }

  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/CargarTodos",
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

  Editar(_id: string) {
    this.idseleccionado = _id
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/CargarId/" + _id,
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
          this.nombre = lista[0].nombre
          this.email = lista[0].email
          this.nombrerol = lista[0].nombrerol
          this.activa = lista[0].activa
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
      path: "/usuarios/Actualizar",
      payload: {
        _id: this.idseleccionado,
        nombre: this.nombre,
        nombrerol: this.nombrerol,
        activa: this.activa
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
      path: "/usuarios/Eliminar",
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

  CargarRoles() {
    var post = {
      host: this.peticion.dominio,
      path: "/roles/CargarTodos",
      payload: {
      }
    }
    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      this.datosRoles = res
    })
  }
}
