import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  tipo:string=""
  opcionOculta:boolean=true

  @ViewChild("useroption") useroption:ElementRef
  @ViewChild("burguer") burguer:ElementRef

  constructor(private renderer:Renderer2) {
    this.tipo="ADMIN"
   }

  ngOnInit(): void {
    this.cargarRol()
  }

  togleMenu(){
    if(this.opcionOculta==true){
      this.renderer.removeClass(this.useroption.nativeElement,'oculto')
      this.opcionOculta=!this.opcionOculta
    }else{
      this.renderer.addClass(this.useroption.nativeElement,'oculto')
      this.opcionOculta=!this.opcionOculta
    }
  }

  cerrarSesion(){
    localStorage.clear()
  }

  mostrarOpciones(){
    this.renderer.addClass(this.burguer.nativeElement,'mostrarBurguer')
  }

  cerrarBurguer(){
    this.renderer.removeClass(this.burguer.nativeElement,'mostrarBurguer')
  }

  cargarRol(){
    let rol=JSON.parse(localStorage.getItem("usuario")).rol.nombre
    this.tipo=rol
  }

  

}
