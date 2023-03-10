import { Component, OnInit } from '@angular/core';
import { DetalleVentas } from '../../models/detalle-ventas';
import { DetalleventaService } from '../../services/detalleventa.service';
import { Utils } from '../../utils/utilitarios';

@Component({
  selector: 'app-detailventa',
  templateUrl: './detailventa.component.html',
  styleUrls: ['./detailventa.component.css']
})
export class DetailventaComponent implements OnInit {

  dvStorageList:DetalleVentas[]
  cantidadTotal:number
  precioTotales:number
  utils:Utils

  constructor(private dvService:DetalleventaService) {
    this.dvStorageList=[]
    this.cantidadTotal=0
    this.precioTotales=0
    this.utils=new Utils()
   }

  ngOnInit(): void {
    this.cargarStorageDv()
  }

  async cargarStorageDv(){
    this.dvStorageList = await this.dvService.listarXventa(parseInt(localStorage.getItem("numventa")))
    this.precioTotal(this.dvStorageList)
    this.cantidadTotal = this.cantidadTotalList()
  }

  cantidadEvent(e){
    console.log(e.target.value);
    
  }

  cantidadTotalList():number{
    let suma = 0;
    this.dvStorageList.forEach((v)=>{
      suma+=v.cantidad
    })
    return suma
  }

  precioTotal(listDv:DetalleVentas[]){
    if(listDv.length < 1){
      this.precioTotales=0
    }else{
      let suma = 0
      listDv.forEach((v)=>{
        let totalUni = v.cantidad * v.idPro.precio
        suma+=totalUni
      })
      this.precioTotales=suma
    }
  }

  eliminarItemDv(dv){
    console.log(dv);
    
  }

  limpiarPedido(){
    localStorage.removeItem("listDetailVenta")
    this.dvStorageList=[]
  }

  eliminarDetallePedido(id:number){
    this.dvService.eliminarDetalle(id).then((res)=>{
      if(res){
        alert("Eliminado de la lista")
        this.cargarStorageDv()
      }else{
        console.log("No se pudo eliminar");        
      }
    })
  }

}
