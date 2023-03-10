import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/producto"
  }

  listar():Promise<Producto[]>{
    return this.http.get<Producto[]>(this.url).toPromise()
  }

  agregar(producto:Producto):Promise<number>{
    try {
      return this.http.post<number>(this.url,producto).toPromise()  
    } catch (error) {
      console.log(error);
      return null
    }
    
  }

  update(producto:Producto):Promise<number>{
    try {
      return this.http.put<number>(this.url,producto).toPromise()  
    } catch (error) {
      console.log(error);
      return null
    }
    
  }

}
