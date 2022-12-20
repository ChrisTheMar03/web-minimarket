import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  tipo:string=""
  isLoading:boolean
  fecha:string
  rol:string

  constructor() {
    this.isLoading=true
    this.rol="ADMIN"
  }

  ngOnInit(): void {
    
    setTimeout(()=>{
      this.isLoading=false
    },500)
    this.obtenerFechaActual()
    this.obtenerRol()
  }

  obtenerFechaActual(){
    this.fecha=new Date().toLocaleDateString().toString()
  }

  obtenerRol(){
    this.rol=JSON.parse(localStorage.getItem("usuario")).rol.nombre
    console.log(this.rol); 
  }

}
