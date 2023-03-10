import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ventas } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/ventas"
  }

   async agregar(venta:Ventas):Promise<number>{
    try {
      return this.http.post<number>(this.url+"/agregar",venta).toPromise()  
    } catch (error) {
      console.log(error);
      return null
    }
    
    }

    async listarVentas():Promise<Ventas[]>{
      return this.http.get<Ventas[]>(this.url).toPromise()
    }

    // filtrarXventa(fecha:string):Promise<Ventas[]>{
    //   return this.http.get<Ventas[]>(this.url+"/filtrar/"+fecha).toPromise()
    // }

}
