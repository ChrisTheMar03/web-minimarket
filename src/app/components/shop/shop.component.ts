import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DetalleVentas } from '../../models/detalle-ventas';
import { UsuarioService } from '../../services/usuario.service';
import { DetalleventaService } from '../../services/detalleventa.service';
import { Usuario } from '../../models/usuario';
import { Ventas } from '../../models/venta';
import { VentaService } from 'src/app/services/venta.service';
import { Utils } from '../../utils/utilitarios';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  isNuevaVenta:string
  productos:Producto[]
  tipeado:string
  cargaProductos:Producto[]
  productoObtenido:Producto
  detalleVenta:DetalleVentas
  cantidad:number
  dvstorageList:DetalleVentas[]
  numVenta:string
  venta:Ventas
  utils:Utils
  btndesabilitar:boolean

  constructor(private productosService:ProductoService,private detalleServicio:DetalleventaService,
    private ventaService:VentaService) {
    this.tipeado=""
    this.productos=[]
    this.cargaProductos=[]
    this.productoObtenido=new Producto()
    this.cantidad=1
    this.dvstorageList= JSON.parse(localStorage.getItem("listDetailVenta")) || []
    this.numVenta= localStorage.getItem("numventa")
    this.isNuevaVenta= localStorage.getItem("nuevaventa") || "1"
    this.utils=new Utils()
    this.btndesabilitar=false
   }

  ngOnInit(): void {
      this.cargarProductos()
      this.cargarIDVenta()
      this.venta = this.cargarVenta()
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
    this.btndesabilitar=false
    this.cantidad=1
    this.productoObtenido=pr
  }

  //Add al detalle Venta
  async agregarVenta(){
    
    if(this.isNuevaVenta=="1"){
      //Venta ya creada anteriormente
      localStorage.setItem("nuevaventa","0")
      this.isNuevaVenta=localStorage.getItem("nuevaventa")
      this.ventaService.agregar(this.venta)
      .then( async (res)=>{
        if(res!=0){
          
          let detalleVe=new DetalleVentas(null,this.cantidad,this.productoObtenido,this.venta)
          
          this.detalleServicio.agregarDetalleVenta(detalleVe)
            .then((res)=>{
              if(res != 0){
                alert("Agregado al detalle venta")
                this.subirDetalleStorage(detalleVe)
              }else{
                console.log("No se pudo agregar al detalle venta");
              }
            })
        }
        
      }).catch((err)=>{console.log(err);})
    }
    else{
      let detalleVe=new DetalleVentas(null,this.cantidad,this.productoObtenido,this.venta) 
      this.detalleServicio.agregarDetalleVenta(detalleVe)
        .then((res)=>{
          if(res != 0){
            alert("Agregado al detalle venta")
            this.subirDetalleStorage(detalleVe)
          }else{
            console.log("No se pudo agregar al detalle venta");
          }
      })
    }
  }

  subirDetalleStorage(dt:DetalleVentas){
    dt.idDetalleVenta=this.dvstorageList.length+1
    this.dvstorageList.push(dt)
    localStorage.setItem("listDetailVenta",JSON.stringify(this.dvstorageList))
  }

  cargarVenta():Ventas{
      
      let id = this.numVenta
      let fecha = new Date().toISOString()
      let user:Usuario = JSON.parse(localStorage.getItem("usuario"))
      return new Ventas(parseInt(id),new Date(fecha),user);    
  }

  cargarIDVenta(){
    if(localStorage.getItem("numventa")==null){
      localStorage.setItem("numventa","1")
      this.numVenta=localStorage.getItem("numventa")
    }else{
      this.numVenta=localStorage.getItem("numventa")
    }
    console.log(this.numVenta);
  }


  validarInput(e,stock){
    e.target.value = this.cantidad
    let error  = document.getElementById("errorinput")
    if(e.target.value>stock || e.target.value<1){
      this.btndesabilitar=true
      // error.innerHTML=`Productos en stock (${stock})`
    }else{
      this.btndesabilitar=false
      // error.innerHTML=""
    }
  }
  
}
