import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any

@Component({
  selector: 'app-apis',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './apis.component.html',
  styleUrl: './apis.component.css'
})
export class ApisComponent implements OnInit{

  constructor(private peticion: PeticionService) { }
  
    ngOnInit(): void {
      this.CargarTodos()
    }
  
    path: string = ""
    metodo: string = ""
    descripcion: string = ""
    tipo: string = "Publico"
    idseleccionado: string = ""
    datos: any[] = []
  
    Nuevo() {
      this.idseleccionado = ""
      this.path = ""
      this.metodo = ""
      this.descripcion = ""
      this.tipo = "Publico"
      $('#nuevoregistro').modal('show')
    }
  
  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/apis/CargarTodos",
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
        path: "/apis/Guardar",
        payload: {
          path: this.path,
          metodo: this.metodo,
          tipo: this.tipo,
          descripcion: this.descripcion
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
        path: "/apis/CargarId/" + _id,
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
            this.metodo = lista[0].metodo
            this.tipo = lista[0].tipo
            this.descripcion = lista[0].descripcion
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
        path: "/apis/Actualizar",
        payload: {
          _id: this.idseleccionado,
          tipo: this.tipo,
          descripcion: this.descripcion
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
        path: "/apis/Eliminar",
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
