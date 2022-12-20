import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/marca"
  }

  listar():Promise<Marca[]>{
    return this.http.get<Marca[]>(this.url).toPromise()
  }

  async buscar(id:number):Promise<Marca>{
    return this.http.get<Marca>(this.url+"/"+id).toPromise()
  }

  agregar(marca:Marca):Promise<void>{
    try {
      return this.http.post<void>(this.url,marca).toPromise()  
    } catch (error) {
      console.log(error);
      return null
    }
    
  }

}
