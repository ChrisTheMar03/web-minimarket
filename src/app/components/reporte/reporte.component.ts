import { Component, OnInit, ViewChild } from '@angular/core';
import { Ventas } from '../../models/venta';
import { VentaService } from '../../services/venta.service';
import { DetalleVentas } from '../../models/detalle-ventas';
import { DetalleventaService } from '../../services/detalleventa.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../utils/utilitarios';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  ventas:Ventas[]
  tipoReporte:number
  ventasTotales:number
  tipoVenta:number
  ventasSelectivas:Ventas[]
  detalleVenta:DetalleVentas[]
  precioTotal:number
  cantidadProductos:number
  precioTotalVentas:number
  vdetalles:DetalleVentas[]
  form:FormGroup
  radioValue:string
  ventasAvanzadas:Ventas[]
  diActual=""
  semanaPasada=""
  cantVentasAvanzadas=0
  totalVentasAvanzado=0
  utils:Utils

  constructor(private ventasService:VentaService,private detalleService:DetalleventaService) {
    this.ventas=[]
    this.tipoReporte=0
    this.ventasTotales=0
    this.tipoVenta=0
    this.ventasSelectivas=[]
    this.detalleVenta=[]
    this.precioTotal=0
    this.cantidadProductos=0
    this.precioTotalVentas=0
    this.vdetalles=[]
    this.ventasAvanzadas=[]
    this.utils=new Utils()
  }

  ngOnInit(): void {
    this.cargarListaDetallesVentas()
    this.cargarVentasTotales()
    // this.cargarDetalleVentas()
  }

  async cargarListaDetallesVentas(){
    this.vdetalles= await this.detalleService.listar()
  }

  async cargarVentasTotales(){
    this.ventas= await this.ventasService.listarVentas() 
  }

  obtenerFecha(fecha){
    if(fecha.value){
      const fechaFind = fecha.value
      this.cargarVentas(fechaFind)
    }
  }

  async cargarVentas(fecha){
    let total=0
    let ventitas = this.ventas.filter((v)=>{
      return v.fecha == fecha
    })
    this.vdetalles.filter((v)=>{
      return v.ventaId.fecha == fecha
    }).forEach((data)=>{
      total+=data.idPro.precio
    })

    this.precioTotalVentas=total
    this.cargarVentasSelectivas(ventitas)
    this.ventasTotales = this.ventasSelectivas.length
  }
  
  obtenerTipoReporte(e){
    const tipo = e.target.value
    this.tipoReporte = tipo
    console.log(this.tipoReporte);    
  }

  obtenerVentasPor(e){
    const tipo = e.target.value
    this.tipoVenta=tipo
    this.cargarVentasSelectivas([])
    this.detalleVenta=[]
    this.precioTotalVentas=0
  }

  obtenerNombre(nombre){
    if(nombre.value){
      const name = nombre.value
      this.ventasXnombreUsuario(name)
    }
  }

  ventasXnombreUsuario(nombre:string){
    let total=0
    let lista=this.ventas.filter((v)=>{
      return v.id.nombre.trim().toLowerCase() == nombre.toLowerCase()
    })
    
    this.vdetalles.filter((v)=>{
      return v.ventaId.id.nombre.toLowerCase() == nombre.toLowerCase()
    }).forEach((data)=>{
      total+=data.idPro.precio
    })

    this.precioTotalVentas=total
    this.cargarVentasSelectivas(lista)
    this.ventasTotales=this.ventasSelectivas.length
  }

  cargarVentasSelectivas(lista:Ventas[]){
    this.ventasSelectivas=lista
  }

  async verVenta(ventaId){
    let obj = {
      cantidad:0,
      precio:0
    }
    this.detalleVenta=await this.detalleService.listarXventa(ventaId)
    this.detalleVenta.forEach((v)=>{
      obj.precio+=v.idPro.precio
      obj.cantidad+=v.cantidad
    })
    this.cantidadProductos=obj.cantidad
    this.precioTotal=obj.precio
  }

  //Radio
  obtenerRadio(){
    this.radioValue=this.form.value
  }

  obtenerValor(e){
    this.cargarVentasAvanzada([])
    this.totalVentasAvanzado=0
    if(e.target.checked){
      this.radioValue=e.target.id
      if(this.radioValue=="semana"){
        this.cargarVentaSemana(this.ventas)
      }else if (this.radioValue=='mes'){
        this.cargarVentasMes(this.ventas)
      }
    }
  }

  cargarVentaSemana(lista:Ventas[]){
    //*milisegundos*60segundos*60minutos*24horas*7dias
    let dato=new Date()
    let calculandoSemana = 1000 * 60 * 60 * 24 * 7
    let hoy=dato.getTime()-calculandoSemana
    let haceUnaSemana = new Date(hoy)
    
    //*hace Semana convertida en cadena
    let semana = haceUnaSemana.toLocaleDateString()
    let today = dato.toLocaleDateString()
    this.semanaPasada=semana
    this.diActual=today
    this.filtrarAvzandoXfecha(haceUnaSemana,lista)
  }

  cargarVentasMes(lista:Ventas[]){
    let dato=new Date()
    let calculandoSemana = 1000 * 60 * 60 * 24 * 30
    let hoy=dato.getTime()-calculandoSemana
    let haceUnaSemana = new Date(hoy)
    let semana = haceUnaSemana.toLocaleDateString()
    let today = dato.toLocaleDateString()
    this.semanaPasada=semana
    this.diActual=today
    this.filtrarAvzandoXfecha(haceUnaSemana,lista)

  }

  filtrarAvzandoXfecha( fecha:Date,lista:Ventas[]){
    let total=0
    let list = lista.filter((v)=>{
      //*actual
      return new Date(v.fecha) >= fecha 
    })    

    this.vdetalles.filter((v)=>{
      return new Date(v.ventaId.fecha) >= fecha
    }).forEach((d)=>{
      total+= d.idPro.precio * d.cantidad
    })

    this.cargarVentasAvanzada(list)
    this.cantVentasAvanzadas=list.length
    this.totalVentasAvanzado=total
  }


  cargarVentasAvanzada(lista:Ventas[]){
    this.ventasAvanzadas=lista
  }

  filtrarXfechasDobles(fecha1,fecha2){
    let total=0;
    if(fecha1.value && fecha2.value){
      
      const fechaInicio=new Date(fecha1.value)
      const fechaFin=new Date(fecha2.value)
      
      this.semanaPasada=fecha1.value
      this.diActual=fecha2.value

      let list=this.ventas.filter((v)=>{
        return new Date(v.fecha) >= fechaInicio &&  new Date(v.fecha) <= fechaFin
      })

      this.vdetalles.filter((v)=>{
        return new Date(v.ventaId.fecha) >= fechaInicio && new Date(v.ventaId.fecha) <= fechaFin
      }).forEach((d)=>{
        total+=d.idPro.precio
      })

      this.cargarVentasAvanzada(list)
      this.cantVentasAvanzadas=list.length
      this.totalVentasAvanzado=total
    }
  }

}
