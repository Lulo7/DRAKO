import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { PeticionService } from '../../services/peticion.service';
import { Router, RouterLink } from '@angular/router';

declare var Notiflix: any
declare var window: any
declare var turnstile: any

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  mitokenCF: string = ""

  ngOnInit(): void {
    const esperar = setInterval(() => {
      if (window["turnstile"]) {
        clearInterval(esperar)
        turnstile.render("#turnstile", {
          sitekey: this.peticion.sitekey,
          callback: (token: string) => {
            this.mitokenCF = token
          }
        })
      }
    }, 100)
  }

  constructor(private peticion: PeticionService, private router: Router) { }

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%*]).{8,}$/;

  nombre: string = ""
  email: string = ""
  password: string = ""
  intentoLogin: boolean = false;

  Login() {
    this.intentoLogin = true;

    var errores = document.getElementsByClassName("fail").length;

    if (errores > 0) {
      Notiflix.Notify.failure("Debe solucionar los campos antes de iniciar sesión");
    }
    else {
      var post = {
        host: this.peticion.dominio,
        path: "/usuarios/Login",
        payload: {
          email: this.email,
          password: this.password,
          token: this.mitokenCF,
          idtracking: localStorage.getItem("idtracking")
        }
      }

      this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
        if (res.state == true) {
          if (res.datos[0].nombrerol == "Administrador") {
            Notiflix.Notify.success(res.mensaje)
            this.router.navigate(["dashboard"])
          }
          else {
            Notiflix.Notify.success(res.mensaje)
            this.router.navigate(["misdatos"])
          }
        }
        else {
          Notiflix.Notify.failure(res.mensaje);

        }
      })
    }
  }
}