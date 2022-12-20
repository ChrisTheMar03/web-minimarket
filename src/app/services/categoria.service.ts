import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/categoria"
  }

  async listar():Promise<Categoria[]>{
    return this.http.get<Categoria[]>(this.url).toPromise()
  }
  
  async buscar(id:number):Promise<Categoria>{
    return this.http.get<Categoria>(this.url+"/"+id).toPromise()
  }

  async agregar(categoria:Categoria):Promise<void>{
    try {
      this.http.post<void>(this.url,categoria).toPromise()    
    } catch (error) {
      console.log(error);
      return null
    }
  
  }

}
