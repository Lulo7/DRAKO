import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { ApisComponent } from './componentes/apis/apis.component';
import { AsignacionComponent } from './componentes/asignacion/asignacion.component';
import { TagsComponent } from './componentes/tags/tags.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { SolicitarcodigoComponent } from './componentes/solicitarcodigo/solicitarcodigo.component';
import { MisdatosComponent } from './componentes/misdatos/misdatos.component';
import { CrearcontrasenaComponent } from './componentes/crearcontrasena/crearcontrasena.component';
import { CambiarcontrasenaComponent } from './componentes/cambiarcontrasena/cambiarcontrasena.component';
import { MisdireccionesComponent } from './componentes/misdirecciones/misdirecciones.component';
import { CatalogoComponent } from './componentes/catalogo/catalogo.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';

export const routes: Routes = [
    {path:"", component:HomeComponent, pathMatch:"full"},
    {path:"home", component:HomeComponent, pathMatch:"full"},
    {path:"contacto", component:ContactoComponent, pathMatch:"full"},
    {path:"detalles/:_id", component:DetallesComponent, pathMatch:"full"},
    {path:"carrito", component:CarritoComponent, pathMatch:"full"},
    
    {path:"registro", component:RegistroComponent, pathMatch:"full"},
    {path:"activarcuenta/:email/:codigo", component:ActivarcuentaComponent, pathMatch:"full"},
    {path:"login", component:LoginComponent, pathMatch:"full"},
    {path:"login/:email", component:LoginComponent, pathMatch:"full"},
    {path:"solicitarcodigo", component:SolicitarcodigoComponent, pathMatch:"full"},
    {path:"crearcontrasena/:email", component:CrearcontrasenaComponent, pathMatch:"full"},
    {path:"crearcontrasena/", component:CrearcontrasenaComponent, pathMatch:"full"},
    {path:"misdatos", component:MisdatosComponent, pathMatch:"full"},
    {path:"cambiarcontrasena", component:CambiarcontrasenaComponent, pathMatch:"full"},
    {path:"checkout", component:CheckoutComponent, pathMatch:"full"},
    {path:"misdirecciones", component:MisdireccionesComponent, pathMatch:"full"},
    {path:"catalogo", component:CatalogoComponent, pathMatch:"full"},

    {path:"dashboard", component:DashboardComponent, pathMatch:"full"},
    {path:"roles", component:RolesComponent, pathMatch:"full"},
    {path:"apis", component:ApisComponent, pathMatch:"full"},
    {path:"asignacion", component:AsignacionComponent, pathMatch:"full"},
    {path:"usuarios", component:UsuariosComponent, pathMatch:"full"},
    {path:"productos", component:ProductosComponent, pathMatch:"full"},
    {path:"servicios", component:ServiciosComponent, pathMatch:"full"},
    {path:"tags", component:TagsComponent, pathMatch:"full"},

    {path:"**", redirectTo:"", pathMatch:"full"},
];
