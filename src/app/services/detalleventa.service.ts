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

  agregarDetalleVenta(detalleventa:DetalleVentas):Promise<number>{
    try {
      return this.http.post<number>(this.url,detalleventa).toPromise() 
    } catch (error) {
      console.log(error);
      return null
    }
  }

  listar():Promise<DetalleVentas[]>{
    return this.http.get<DetalleVentas[]>(this.url).toPromise()
  }

  listarXventa(id:number):Promise<DetalleVentas[]>{
    return this.http.get<DetalleVentas[]>(`${this.url}/xventa/${id}`).toPromise()
  }

  eliminarDetalle(id:number):Promise<boolean>{
    return this.http.delete<boolean>(this.url+"/"+id).toPromise()
  }

}
