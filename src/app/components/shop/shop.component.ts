import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DetalleVentas } from '../../models/detalle-ventas';
import { UsuarioService } from '../../services/usuario.service';
import { DetalleventaService } from '../../services/detalleventa.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  productos:Producto[]
  tipeado:string
  cargaProductos:Producto[]
  productoObtenido:Producto
  detalleVenta:DetalleVentas
  cantidad:number

  constructor(private productosService:ProductoService,private detalleServicio:DetalleventaService) {
    this.tipeado=""
    this.productos=[]
    this.cargaProductos=[]
    this.productoObtenido=new Producto()
    this.cantidad=0
   }

  ngOnInit(): void {
      this.cargarProductos()
  }

  async filtrar(e){
    const valor:string = e.target.value
    if(valor.trim().length > 1){
      let filtrar:Producto[] = this.cargaProductos.filter((v)=>{
        return v.nombre.toLowerCase().includes(valor) || 
        v.idCat.nombre.toLowerCase().includes(valor) || 
        v.idCat.nombre.toLowerCase().includes(valor)
      })
      this.updateProductos(filtrar)
    }else{
      this.updateProductos([])
    }
      
  }

  async updateProductos(productos:Producto[]){
    this.productos=productos
  }

  async cargarProductos(){
    this.cargaProductos=await this.productosService.listar()
  }

  obtenerProducto(pr){
    this.productoObtenido=pr
  }

  agregarVenta(){
    let detalleVe=new DetalleVentas(null,this.cantidad,this.productoObtenido)
    // this.detalleServicio.agregarDetalleVenta(detalleVe)
  }

}
