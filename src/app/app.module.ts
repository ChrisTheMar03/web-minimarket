import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CargaComponent } from './components/carga/carga.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentaComponent } from './components/venta/venta.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ProcesosComponent } from './components/procesos/procesos.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShopComponent } from './components/shop/shop.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    CabeceraComponent,
    AdministracionComponent,
    CargaComponent,
    InventarioComponent,
    VentaComponent,
    ReporteComponent,
    ProcesosComponent,
    ProductosComponent,
    CategoriasComponent,
    MarcasComponent,
    DashboardComponent,
    ShopComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
