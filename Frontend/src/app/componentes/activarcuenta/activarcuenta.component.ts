import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { PeticionService } from '../../services/peticion.service';

declare var Notiflix: any;

@Component({
  selector: 'app-activarcuenta',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './activarcuenta.component.html',
  styleUrl: './activarcuenta.component.css'
})
export class ActivarcuentaComponent implements OnInit {
  email: string = '';
  codigo: string = '';

  procesando: boolean = true;
  activacionCompleta: boolean = false;
  mensaje: string = 'Estamos verificando tu código de activación...';

  constructor(
    private actroute: ActivatedRoute,
    private peticion: PeticionService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.email = this.actroute.snapshot.params['email'] || '';
    this.codigo = this.actroute.snapshot.params['codigo'] || '';

    if (!this.email || !this.codigo) {
      this.procesando = false;
      this.activacionCompleta = false;
      this.mensaje = 'El enlace de activación está incompleto o no es válido.';
      return;
    }

    this.activarCuenta();
  }

  activarCuenta(): void {
    const url =
      this.peticion.dominio +
      '/usuarios/Activar/' +
      encodeURIComponent(this.email) +
      '/' +
      encodeURIComponent(this.codigo);

    this.peticion.Get(url).subscribe({
      next: (res: any) => {
        this.procesando = false;
        this.activacionCompleta = res.state === true;
        this.mensaje = res.mensaje;

        if (this.activacionCompleta) {
          Notiflix.Notify.success(res.mensaje);
        } else {
          Notiflix.Notify.failure(res.mensaje);
        }
      },
      error: () => {
        this.procesando = false;
        this.activacionCompleta = false;
        this.mensaje =
          'No se pudo conectar con el servidor. Intenta nuevamente más tarde.';

        Notiflix.Notify.failure(this.mensaje);
      }
    });
  }

  irAlLogin(): void {
    this.route.navigate(['/login']);
  }
}