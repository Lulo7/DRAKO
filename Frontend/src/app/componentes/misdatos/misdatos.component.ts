import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../services/peticion.service';
import { MenulateralComponent } from '../menulateral/menulateral.component';

declare var Notiflix: any

@Component({
  selector: 'app-misdatos',
  standalone: true,
  imports: [FormsModule, CommonModule, MenulateralComponent],
  templateUrl: './misdatos.component.html',
  styleUrl: './misdatos.component.css'
})
export class MisdatosComponent implements OnInit {

  ngOnInit(): void {
    this.llenardatos()
    this.CargarMisArchivos()
  }

  constructor(public peticion: PeticionService) { }

  nombre: string = ""
  email: string = ""
  rol: string = ""
  estado: string = ""
  datosarchivos: any[] = []
  selectFile!: File

  llenardatos() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/Estado",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      this.nombre = res.nombre
      this.email = res.email
      this.rol = res.nombrerol
      if(res.estado == "Si"){
        this.estado = "Activo"
      }
      else{
        this.estado = "InActivo"
      }
    })
  }

  ActualizarMisDatos() {

    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/ActualizarMisDatos",
      payload: {
        nombre: this.nombre
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
      }
    })
  }

  CargarMisArchivos() {

    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/CargarMisArchivos",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      this.datosarchivos = res
      for (let a = 0; a < this.datosarchivos.length; a++) {

        this.datosarchivos[a].extension = this.datosarchivos[a].nombre.split(".")[1]

      }
    })
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0]

    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/UploadFiles/"
    }

    this.peticion.Upload(this.selectFile, post.host + post.path).subscribe((res) => {
      if (res.state == true) {
        this.CargarMisArchivos()
        Notiflix.Notify.success(res.mensaje)
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }
}
