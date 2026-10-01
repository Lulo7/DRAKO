import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { PeticionService } from '../../services/peticion.service';

declare var Chart:any

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MenulateralComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private peticion: PeticionService) { }

  ngOnInit(): void {
    this.GraficoUsuarios()
    this.Grafico2()
    this.contadorsesiones()
  }

  GraficoUsuarios() {
    var x = 20;

    const ctx = document.getElementById("mychart") as HTMLCanvasElement;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [{
          label: "Lista datos 2026", //titulo
          data: [10, 20, 30, 100, x],
          //backgroundColor:["yellow","black","blue"], 
          //borderColor:["black","white","white"],
          borderWidth: 1
        },
        {
          label: "Lista datos 2025",
          data: [5, 10, 10, 50, 0],
          //backgroundColor:["yellow","black","blue"], 
          //borderColor:["black","white","white"],
          borderWidth: 1
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    setInterval(() => {
      x++;

      chart.data.datasets[0].data[4] = x;

      chart.update();

    }, 100);

  }

  Grafico2() {

    const ctx = document.getElementById("mychart2") as HTMLCanvasElement;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["A", "B"],
        datasets: [{
          label: "Lista datos Prueba",
          data: [10, 20],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  }

  contadorsesiones() {

    var post = {
      host: this.peticion.dominio,
      path: "/usuarios/contadorsesiones",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
      if (!Array.isArray(res)) {
        return
      }

      let correos = res.map((item: any) => item.email)
      let valores = res.map((item: any) => item.contador)

      let total = res.reduce((acumulador: number, item: any) => acumulador + item.contador, 0)

      correos.push("todos@dominio.com")
      valores.push(total)

      const ctx = document.getElementById("mychartsesiones") as HTMLCanvasElement;

      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: correos,
          datasets: [{
            label: "Usuarios Registrados",
            data: valores,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

      },
      error: () => {
        console.log("No se pudo cargar el contador de sesiones")
      }
    })

  }
}
