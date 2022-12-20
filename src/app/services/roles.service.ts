import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url:string

  constructor(private http:HttpClient) {
    this.url="http://localhost:9090/tienda/roles"
  }

  listar():Promise<Roles[]>{
    return this.http.get<Roles[]>(this.url).toPromise()
  }

}
