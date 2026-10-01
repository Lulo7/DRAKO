import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any
declare var window: any
declare var turnstile: any

@Component({
  selector: 'app-solicitarcodigo',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './solicitarcodigo.component.html',
  styleUrl: './solicitarcodigo.component.css'
})
export class SolicitarcodigoComponent implements OnInit {

  email: string = ""
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

  constructor(private peticion: PeticionService, private route: Router) { }

  solicitarCodigo() {
    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/SolicitarCodigoRecuperacion",
      payload: {
        email: this.email,
          token:this.mitokenCF
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        this.route.navigate(["/crearcontrasena", this.email])
      }
    })
  }

}
