import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  rol:string
  constructor() {
    this.rol="USER"
   }

  ngOnInit(): void {
    this.obtenerRol()
  }

  obtenerRol(){
    this.rol=JSON.parse(localStorage.getItem("usuario")).rol.nombre
    console.log(this.rol);
    
  }

}
