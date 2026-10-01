import { Component } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any
declare var window: any
declare var turnstile: any

@Component({
  selector: 'app-cambiarcontrasena',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './cambiarcontrasena.component.html',
  styleUrl: './cambiarcontrasena.component.css'
})
export class CambiarcontrasenaComponent {

  passactual:string = ""
  password:string = ""
  confirm:string = ""

  constructor(private peticion:PeticionService){}

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[#$%*]).{8,}$/;
  numeroCondRegex = /(?=.*\d)/
  mayusConRegex = /(?=.*[A-Z])/
  especialRegex = /(?=.*[#$%*])/
  caracterRegex = /[A-Za-z\d#$%*]{8,}/

  Restablecer(){
    var errores = document.getElementsByClassName("fail").length
    if (errores > 0) {
      Notiflix.Notify.failure("Debe Solucionar los campos antes de hacer el registro")
    }
    else {
      var post = {
        host: this.peticion.dominio,
        path: "/usuarios/cambiarPassword",
        payload: {
          passactual: this.passactual,
          password: this.password,
          confirm: this.confirm
        }
      }
      this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
        if (res.state == true) {
          Notiflix.Notify.success(res.mensaje)
        }
        else {
          Notiflix.Notify.failure(res.mensaje)
          
        }
      })
    }
  }
}
