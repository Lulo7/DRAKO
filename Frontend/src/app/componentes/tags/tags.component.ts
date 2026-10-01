import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from "../menulateral/menulateral.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
    constructor(private peticion: PeticionService) { }
  
    ngOnInit(): void {
      this.CargarTodos()
    }
  
    code: string = ""
    nombre: string = ""
    idseleccionado: string = ""
    datos: any[] = []
  
    Nuevo() {
      this.idseleccionado = ""
      this.code = ""
      this.nombre = ""
      $('#nuevoregistro').modal('show')
    }
  
    CargarTodos() {
      var post = {
        host: this.peticion.dominio,
        path: "/tags/cargarTodos",
        payload: {
        }
      }
  
      this.peticion.Get(post.host + post.path).subscribe({
        next: (res: any) => {
          this.datos = Array.isArray(res) ? res : (res != null && Array.isArray(res.data) ? res.data : [])
        },
        error: () => {
          this.datos = []
          Notiflix.Notify.failure("No se pudieron cargar los tags")
        }
      })
    }
  
    Guardar() {
      var post = {
        host: this.peticion.dominio,
        path: "/tags/Guardar",
        payload: {
          code: this.code,
          nombre: this.nombre
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
        path: "/tags/CargarId/" + _id,
        payload: {
        }
      }
      this.peticion.Get(post.host + post.path).subscribe({
        next: (res: any) => {
          const lista = Array.isArray(res) ? res : (res != null && Array.isArray(res.data) ? res.data : [])

          if (lista.length > 0) {
            this.code = lista[0].code
            this.nombre = lista[0].nombre
            $('#nuevoregistro').modal('show')
          }
          else {
            Notiflix.Notify.failure("Puede que el registro fuera eliminado")
          }
        },
        error: () => {
          Notiflix.Notify.failure("No se pudo cargar el tag")
        }
      })
    }
  
    Actualizar() {
      var post = {
        host: this.peticion.dominio,
        path: "/tags/Actualizar",
        payload: {
          _id: this.idseleccionado,
          nombre: this.nombre
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
        path: "/tags/Eliminar",
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
