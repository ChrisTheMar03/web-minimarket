import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleVentas } from '../models/detalle-ventas';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {

  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/detalleventa"
  }

  agregarDetalleVenta(detalleventa:DetalleVentas):void{
    this.http.post<void>(this.url,detalleventa)
  }

}
