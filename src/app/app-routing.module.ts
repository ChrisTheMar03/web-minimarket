import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { LoginComponent } from './components/login/login.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ShopComponent } from './components/shop/shop.component';
import { VentaComponent } from './components/venta/venta.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'principal',component:PrincipalComponent},
  {path:'procesos',component:ProcesosComponent,children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'inventario',component:InventarioComponent},
    {path:'venta',component:VentaComponent},
    {path:'administracion',component:AdministracionComponent,children:[
      {path:'producto',component:ProductosComponent},
      {path:'categoria',component:CategoriasComponent},
      {path:'marca',component:MarcasComponent},
      {path:'usuario',component:UsuarioComponent}
    ]},
    {path:'reporte',component:ReporteComponent},
  ]},
  {path:'shop',component:ShopComponent}
  
  // {path:'**',redirectTo:'principal'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
