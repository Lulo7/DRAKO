import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from "../footer/footer.component";
import { PeticionService } from '../../services/peticion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  datos: any[] = []
  cargando: boolean = true
  random: number = Date.now()

  ngOnInit(): void {
    this.CargarTodos()
  }

  constructor(public peticion:PeticionService){ }

  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/productos/cargarTodos",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
        this.datos = Array.isArray(res) ? res.filter((item: any) => item != null && item._id) : []
        this.cargando = false
      },
      error: () => {
        this.datos = []
        this.cargando = false
      }
    })
  }

  imagenNoDisponible(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/default.png';
  }

}

