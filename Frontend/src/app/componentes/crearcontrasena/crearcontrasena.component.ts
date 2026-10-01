import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any
declare var window: any
declare var turnstile: any

@Component({
  selector: 'app-crearcontrasena',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './crearcontrasena.component.html',
  styleUrl: './crearcontrasena.component.css'
})
export class CrearcontrasenaComponent implements OnInit {

  email: string = ""
  codigo: string = ""
  password: string = ""
  confirma: string = ""
  mitokenCF:string = ""

  ngOnInit(): void {
    const esperar = setInterval(() => {
      if(window["turnstile"]){
        clearInterval(esperar)
        turnstile.render("#turnstile", {
          sitekey:this.peticion.sitekey,
          callback:(token:string) => {
            this.mitokenCF = token
          }
        })
      }
    },100)

    this.email = this.actroute.snapshot.params["email"]
  }

  constructor(private actroute: ActivatedRoute, private peticion: PeticionService, private route: Router) { }

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%*]).{8,}$/;
  numeroCondRegex = /(?=.*\d)/
  mayusConRegex = /(?=.*[A-Z])/
  especialRegex = /(?=.*[#$%*])/
  caracterRegex = /[A-Za-z\d#$%*]{8,}/

  Recuperar() {
    var errores = document.getElementsByClassName("fail").length
    if (errores > 0) {
      Notiflix.Notify.failure("Debe Solucionar los campos antes de hacer el registro")
    }
    else {
      var post = {
        host: this.peticion.dominio,
        path: "/usuarios/recuperarPassword",
        payload: {
          email: this.email,
          codigo: this.codigo,
          password: this.password,
          confirmar: this.confirma,
          token:this.mitokenCF
        }
      }
      this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
        if (res.state == false) {
          Notiflix.Notify.failure(res.mensaje)
        }
        else {
          Notiflix.Notify.success(res.mensaje)
          this.route.navigate(["login", this.email])
        }
      })
    }
  }
}
