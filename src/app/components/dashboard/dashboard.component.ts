import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';
import { ProductoService } from '../../services/producto.service';
import { DetalleVentas } from '../../models/detalle-ventas';
import { DetalleventaService } from '../../services/detalleventa.service';
import { Ventas } from '../../models/venta';
import { Utils } from 'src/app/utils/utilitarios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ventasRealizadas:number
  totalIngresos:number
  cantidadProductos:number
  ventas:Ventas[]
  ventaObtenida:Ventas
  detalleventas:DetalleVentas[]
  detalleventasTotales:DetalleVentas[]
  usuarionombre:string
  precioTotal:number
  cantidadTotal:number
  fechaVenta:string
  utils:Utils

  constructor(private ventaService:VentaService,private productosService:ProductoService,
    private ventasService:VentaService,private detallevService:DetalleventaService) {
    this.ventasRealizadas=0
    this.totalIngresos=0
    this.cantidadProductos=0
    this.ventas=[]
    this.ventaObtenida=new Ventas()
    this.detalleventas=[]
    this.usuarionombre=""
    this.precioTotal=0
    this.cantidadTotal=0
    this.fechaVenta=""
    this.utils=new Utils()
   }

  ngOnInit(): void {
    this.cargarCantidadProductos()
    this.cargarVentas()
    this.cargarDetallesVentas()
  }

  async cargarVentas(){
    let ventas = await this.ventaService.listarVentas()
    ventas.sort((a,b)=>{
      return  b.ventaId-a.ventaId
    })

    this.ventas=ventas
    this.ventasRealizadas=this.ventas.length
  }

  async cargarCantidadProductos(){
    this.cantidadProductos = await (await this.productosService.listar()).length 
  }

  async cargarVentasRealizadas(){
    this.ventasRealizadas =this.ventas.length
  }

  async visualizarDetalleVenta(v){
    const opcionalDetalleVenta = await this.detallevService.listarXventa(v.ventaId);
    this.ventaObtenida = v
    this.detalleventas = opcionalDetalleVenta 
    this.usuarionombre = this.ventaObtenida.id.nombre
    this.precioTotalModal(this.detalleventas)
    this.fechaVenta=new Date().toLocaleDateString()
  }

  precioTotalModal(lista:DetalleVentas[]){
    let sum=0
    let can=0
    lista.forEach((v)=>{
      sum+=v.idPro.precio * v.cantidad
      can+=v.cantidad
    })
    this.precioTotal = sum
    this.cantidadTotal=can
  }

  async cargarDetallesVentas(){
    this.detalleventasTotales = await this.detallevService.listar()
    this.totalIngresos = this.obtenerTotalIngresos()
  }

  obtenerTotalIngresos():number{
      let suma = 0      
      this.detalleventasTotales.forEach((v)=>{
        suma+=v.idPro.precio * v.cantidad
      })
      return suma
  }


}
