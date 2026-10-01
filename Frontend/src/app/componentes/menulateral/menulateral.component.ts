import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { PeticionService } from '../../services/peticion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var Notiflix: any

@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit {

  constructor(public peticion: PeticionService, private router: Router) { }
  ngOnInit(): void {
    this.cargarEstado()
  }

  nombre: string = "Cargando..."
  nombrerol: string = "Cargando..."
  _id: string = ""
  hora: number = 0
  selectFile!: File
  random: number = 0

  cargarEstado() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/Estado",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      if (res == null || res.nombre == undefined || res.nombre == null) {
        this.router.navigate(["login"])
        return
      }
      this.nombre = res.nombre
      this.nombrerol = res.nombrerol

      if (res._id != undefined && res._id != null) {
        this._id = res._id
        this.random = Date.now()
      }

      var expira = new Date(res.cookie.expires)
      var horaactual = new Date()
      var total = Math.floor((expira.getTime() - horaactual.getTime()) / (1000 * 60))
      this.hora = total + 1
      setInterval(() => {
        this.hora = total - 1
        if (this.hora == 0) {
          this.router.navigate(["login"])
        }
      }, 60000)

    })
  }

  Logout() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/Logout",
      payload: {
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      Notiflix.Notify.success(res.mensaje)
      let idTracking = localStorage.getItem("idtracking")
      if (idTracking != undefined || idTracking != null) {
        localStorage.setItem("idtracking", crypto.randomUUID())
      }
      this.router.navigate(["login"])
    })
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0]

    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/SubirAvatar"
    }

    this.peticion.Upload(this.selectFile, post.host + post.path).subscribe((res) => {
      if (res.state == true) {
        this.random = Math.random() * (99999 - 0) + 0;
        Notiflix.Notify.success(res.mensaje)
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }
}
