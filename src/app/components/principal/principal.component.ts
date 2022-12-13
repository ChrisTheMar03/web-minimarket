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

  constructor() {
    this.isLoading=true
  }

  ngOnInit(): void {
    
    setTimeout(()=>{
      this.isLoading=false
    },500)
    this.obtenerFechaActual()
  }

  obtenerFechaActual(){
    this.fecha=new Date().toLocaleDateString().toString()
  }

}
