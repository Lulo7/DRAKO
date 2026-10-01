import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { PeticionService } from '../../services/peticion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


declare var Notiflix: any
declare var window: any
declare var turnstile: any


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit{

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
  }


  constructor(private peticion: PeticionService) { }

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%*]).{8,}$/
  numeroCondRegex = /(?=.*\d)/
  mayusConRegex = /(?=.*[A-Z])/
  especialRegex = /(?=.*[#$%*])/
  caracterRegex = /[A-Za-z\d#$%*]{8,}/



  nombre: string = ""
  email: string = ""
  password: string = ""

  Registrar() {

    var errores = document.getElementsByClassName("fail").length
    
    if (errores > 0) {
      Notiflix.Notify.failure("Debe Solucionar los campos antes de hacer el registro")
    }
    else {
      var post = {
        host: this.peticion.dominio,
        path: "/usuarios/Registrar",
        payload: {
          email: this.email,
          nombre: this.nombre,
          password: this.password,
          token:this.mitokenCF
        }
      }

      this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
        console.log(res)
        if (res.state == false) {
          Notiflix.Notify.failure(res.mensaje);
        }
        else{
          Notiflix.Notify.success(res.mensaje)
        }
      })
    }
  }

  

}
