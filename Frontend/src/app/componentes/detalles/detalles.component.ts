import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeticionService } from '../../services/peticion.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Subscription } from 'rxjs';

declare var Notiflix: any

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, RouterLink],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit, OnDestroy {

  codigo: string = ""
  marca: string = ""
  nombre: string = ""
  movimiento: string = ""
  calibre: string = ""
  material: string = ""
  pulso: string = ""
  caja: string = ""
  departamento: string = ""
  descripcion: string = ""
  cantidad: string = ""
  precio: string = ""
  descuento: string = ""
  imagen: string = ""
  indicacion: string = ""
  idseleccionado: string = ""
  listaunidades: number[] = []
  unidadescompra: number = 1
  datosimagenes: any[] = [];
  random2: number = Date.now();
  imagenPrincipal: string = '';
  imagenRespaldo: string = 'assets/default.png';

  cargando: boolean = true;
  cargado: boolean = false;
  cargofallo: boolean = false;

  private suscripcionRuta?: Subscription

  constructor(public peticion: PeticionService, private actrouter: ActivatedRoute, private carrito: CarritoService) { }

  ngOnInit(): void {
    this.suscripcionRuta = this.actrouter.paramMap.subscribe((params) => {
      const _id = params.get("_id")
      if (_id) {
        this.idseleccionado = _id
        this.detalleproducto(_id)
      }
      else {
        this.cargando = false
        this.cargofallo = true
      }
    })
  }

  ngOnDestroy(): void {
    this.suscripcionRuta?.unsubscribe()
  }

  private limpiarProducto(): void {
    this.codigo = ""
    this.marca = ""
    this.nombre = ""
    this.movimiento = ""
    this.calibre = ""
    this.material = ""
    this.pulso = ""
    this.caja = ""
    this.departamento = ""
    this.descripcion = ""
    this.cantidad = ""
    this.precio = ""
    this.descuento = ""
    this.imagen = ""
    this.indicacion = ""
    this.listaunidades = []
    this.unidadescompra = 1
    this.datosimagenes = []
    this.imagenPrincipal = ""
    this.cargado = false
  }

  private listaRespuesta(res: any): any[] {
    if (Array.isArray(res)) {
      return res
    }
    if (res != null && Array.isArray(res.data)) {
      return res.data
    }
    return []
  }

  detalleproducto(_id: string) {
    this.limpiarProducto()
    this.cargando = true
    this.cargofallo = false

    if (!/^[0-9a-fA-F]{24}$/.test(_id)) {
      this.falloCarga("El identificador del producto no es válido")
      return
    }

    const url = this.peticion.dominio + "/productos/CargarId/" + _id

    this.peticion.Get(url).subscribe({
      next: (res: any) => {
        const lista = this.listaRespuesta(res)

        if (lista.length > 0) {
          this.asignarProducto(lista[0], _id)
        }
        else {
          this.cargarDesdeListado(_id)
        }
      },
      error: () => {
        this.cargarDesdeListado(_id)
      }
    })
  }

  private cargarDesdeListado(_id: string): void {
    this.peticion.Get(this.peticion.dominio + "/productos/CargarTodos").subscribe({
      next: (res: any) => {
        const lista = this.listaRespuesta(res)
        const producto = lista.find((item: any) => item != null && String(item._id) === String(_id))

        if (producto != null) {
          this.asignarProducto(producto, _id)
        }
        else {
          this.falloCarga("Puede que el registro fuera eliminado")
        }
      },
      error: () => {
        this.falloCarga("No se pudo cargar la información del producto")
      }
    })
  }

  private falloCarga(mensaje: string): void {
    this.cargando = false
    this.cargado = false
    this.cargofallo = true
    Notiflix.Notify.failure(mensaje)
  }

  private asignarProducto(producto: any, _id: string): void {
    this.cargando = false

    this.codigo = producto.codigo
    this.marca = producto.marca
    this.nombre = producto.nombre
    this.movimiento = producto.movimiento
    this.calibre = producto.calibre
    this.material = producto.material
    this.pulso = producto.pulso
    this.caja = producto.caja
    this.departamento = producto.departamento
    this.descripcion = producto.descripcion
    this.cantidad = producto.cantidad
    this.precio = producto.precio
    this.descuento = producto.descuento
    this.imagen = producto.imagen
    this.indicacion = producto.indicacion
    this.cargado = true
    this.cargofallo = false

    const stock = parseInt(String(producto.cantidad), 10)
    this.listaunidades = []
    if (!isNaN(stock)) {
      for (let a = 1; a < stock + 1; a++) {
        this.listaunidades.push(a)
      }
    }
    this.unidadescompra = this.listaunidades.length > 0 ? 1 : 0

    this.imagenPrincipal =
      this.peticion.dominioavatar + '/Productos/' +
      _id + '.png?v=' + this.random2

    this.CargarImagenes(_id)
  }

  AddCar(idProducto: string) {
    var post = {
      host: this.peticion.dominio,
      path: "/carritos/Guardar",
      payload: {
        idproducto: idProducto,
        cantidad: this.unidadescompra,
        idtracking: localStorage.getItem("idtracking")
      }
    }
    this.peticion.Post(post.host + post.path, post.payload).subscribe({
      next: (res: any) => {
        if (res != null && res.state == true) {
          Notiflix.Notify.success(res.mensaje)
          this.carrito.Load()
        }
        else {
          Notiflix.Notify.failure(res != null && res.mensaje ? res.mensaje : "No se pudo agregar al carrito")
        }
      },
      error: () => {
        Notiflix.Notify.failure("No se pudo agregar al carrito")
      }
    })
  }

  CargarImagenes(_id: string): void {
    const url = this.peticion.dominio + '/productos/CargarImagenes/' + _id;

    this.peticion.Get(url).subscribe({
      next: (res: any) => {
        const lista = Array.isArray(res) ? res : []
        this.datosimagenes = lista.filter((item: any) => item != null && !!item.nombre)
      },
      error: () => {
        this.datosimagenes = []
      }
    });
  }

  SeleccionarImagen(url: string): void {
    this.imagenPrincipal = url;
  }

  ErrorImagenPrincipal(): void {
    this.imagenPrincipal = this.imagenRespaldo;
  }

  ErrorMiniatura(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = this.imagenRespaldo;
  }

}
