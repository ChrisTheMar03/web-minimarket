import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/usuario"
  }

  async iniciarSesion(usuario:string,password:string):Promise<Usuario>{
    try {
      return this.http.get<Usuario>(`${this.url}/sesion/${usuario}/${password}`).toPromise()
    } catch (error) {
      console.log(error);
      return null
    }
  }

}
