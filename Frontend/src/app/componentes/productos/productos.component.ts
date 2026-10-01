import { Component, OnInit } from '@angular/core';
import { MenulateralComponent } from '../menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../../services/peticion.service';

declare var $: any
declare var Notiflix: any


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MenulateralComponent, FormsModule, CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  constructor(public peticion: PeticionService) { }

  ngOnInit(): void {
    this.CargarTodos()
  }

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
  selectFile!: File
  random:number = 0
  random2:number = 0

  datosimagenes: any[] = []
  datos: any[] = []

  Nuevo() {
    this.idseleccionado = ""
    this.imagen = ""
    this.datosimagenes = []
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
    this.indicacion = ""
    $('#nuevoregistro').modal('show')
  }

  CargarTodos() {
    var post = {
      host: this.peticion.dominio,
      path: "/productos/cargarTodos",
      payload: {
      }
    }

    this.peticion.Get(post.host + post.path).subscribe((res: any) => {
      this.datos = res
    })
  }

  Guardar() {
    var post = {
      host: this.peticion.dominio,
      path: "/productos/Guardar",
      payload: {
        codigo: this.codigo,
        marca: this.marca,
        nombre: this.nombre,
        movimiento: this.movimiento,
        calibre: this.calibre,
        material: this.material,
        pulso: this.pulso,
        caja: this.caja,
        departamento: this.departamento,
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        precio: this.precio,
        descuento: this.descuento.toString(),
        imagen: this.imagen,
        indicacion: this.indicacion
      }
    }

    this.peticion.Post(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == true) {
        Notiflix.Notify.success(res.mensaje)
        this.CargarTodos()
        $('#nuevoregistro').modal('hide')
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }

  Editar(_id: string) {
    this.idseleccionado = _id
    var post = {
      host: this.peticion.dominio,
      path: "/productos/CargarId/" + _id,
      payload: {
      }
    }
    this.peticion.Get(post.host + post.path).subscribe({
      next: (res: any) => {
        const lista = this.listaRespuesta(res)

        if (lista.length > 0) {
          this.cargarEdicion(lista[0])
        }
        else {
          this.EditarDesdeListado(_id)
        }
      },
      error: () => {
        this.EditarDesdeListado(_id)
      }
    })
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

  private EditarDesdeListado(_id: string) {
    this.peticion.Get(this.peticion.dominio + "/productos/CargarTodos").subscribe({
      next: (res: any) => {
        const lista = this.listaRespuesta(res)
        const producto = lista.find((item: any) => item != null && String(item._id) === String(_id))

        if (producto != null) {
          this.cargarEdicion(producto)
        }
        else {
          Notiflix.Notify.failure("Puede que el registro fuera eliminado")
        }
      },
      error: () => {
        Notiflix.Notify.failure("No se pudo cargar el producto")
      }
    })
  }

  private cargarEdicion(producto: any) {
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
    this.descuento = producto.descuento.toString()
    this.imagen = producto.imagen
    this.indicacion = producto.indicacion
    this.CargarImagenes(this.idseleccionado)
    $('#nuevoregistro').modal('show')
  }

  Actualizar() {
    var post = {
      host: this.peticion.dominio,
      path: "/productos/Actualizar",
      payload: {
        _id: this.idseleccionado,
        marca: this.marca,
        nombre: this.nombre,
        movimiento: this.movimiento,
        calibre: this.calibre,
        material: this.material,
        pulso: this.pulso,
        caja: this.caja,
        departamento: this.departamento,
        descripcion: this.descripcion,
        cantidad: this.cantidad,
        precio: this.precio,
        descuento: this.descuento.toString(),
        imagen: this.imagen,
        indicacion: this.indicacion
      }
    }
    this.peticion.Put(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodos()
      }
    })
  }

  Eliminar() {
    var post = {
      host: this.peticion.dominio,
      path: "/productos/Eliminar",
      payload: {
        _id: this.idseleccionado
      }
    }
    this.peticion.Delete(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        $('#nuevoregistro').modal('hide')
        this.CargarTodos()
      }
    })
  }

  onFileSelect(event: any) {
    this.selectFile = event.target.files[0]

    var post = {
      host: this.peticion.dominio,
      path: "/productos/SubirImagen/" + this.idseleccionado
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

  AgregarImagen(event: any) {
    this.selectFile = event.target.files[0]

    var post = {
      host: this.peticion.dominio,
      path: "/productos/AdicionarImagen/" + this.idseleccionado
    }

    this.peticion.Upload(this.selectFile, post.host + post.path).subscribe((res) => {
      if (res.state == true) {
        this.random2 = Math.random() * (99999 - 0) + 0;
        this.CargarImagenes(this.idseleccionado)
        Notiflix.Notify.success(res.mensaje)
      }
      else {
        Notiflix.Notify.failure(res.mensaje)
      }
    })
  }

  imagenNoDisponible(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'assets/default.png';
  }

  CargarImagenes(_id:string){
    var post = {
      host: this.peticion.dominio,
      path: "/productos/CargarImagenes/" + _id
    }

    this.peticion.Get(post.host + post.path).subscribe((res:any) => {
      this.datosimagenes = res
    })
  }

  RemoverImagen(_id:string){
    var post = {
      host: this.peticion.dominio,
      path: "/productos/RemoverImagen",
      payload: {
        _id: _id
      }
    }
    this.peticion.Delete(post.host + post.path, post.payload).subscribe((res: any) => {
      if (res.state == false) {
        Notiflix.Notify.failure(res.mensaje)
      }
      else {
        Notiflix.Notify.success(res.mensaje)
        this.CargarImagenes(this.idseleccionado)
      }
    })
  }
}