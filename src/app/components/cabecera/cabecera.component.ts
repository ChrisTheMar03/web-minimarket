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
  busquedaRutas:any[]
  listaIter=[]

  @ViewChild("useroption") useroption:ElementRef
  @ViewChild("burguer") burguer:ElementRef

  constructor(private renderer:Renderer2) {
    this.tipo="ADMIN"
    //* ""/shop","/procesos/reporte","procesos"
    this.busquedaRutas=[];
   }

  ngOnInit(): void {
    this.cargarRol()
    //this.cargarRutas()
    this.cargarRutas()
    this.cargarLista([])
  }

  cargarRutas(){
    this.busquedaRutas=[
      {
        nombre:"Principal",
        ruta:"principal",
        ruta2:"/Principal"
      },
      {
        nombre:"Dashboard",
        ruta:"procesos/dashboard",
        ruta2:"/Dashboard"
      },
      {
        nombre:"Administracion",
        ruta:"procesos/administracion",
        ruta2:"/Administracion"
      },
      {
        nombre:"Venta",
        ruta:"shop",
        ruta2:"/Venta"
      },
      {
        nombre:"Reporte",
        ruta:"procesos/reporte",
        ruta2:"/Reporte"
      },
      {
        nombre:"Procesos",
        ruta:"procesos",
        ruta2:"/Procesos"
      }
    ]
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
    localStorage.removeItem("usuario")
  }

  mostrarOpciones(){
    this.renderer.addClass(this.burguer.nativeElement,'mostrarBurguer')
  }

  cerrarBurguer(){
    this.renderer.removeClass(this.burguer.nativeElement,'mostrarBurguer')
  }

  cargarRol(){
    let rol=JSON.parse(localStorage.getItem("usuario")).idRol.nombre
    this.tipo=rol
  }

  busqueda(e){
    const data =e.target.value.toLowerCase();
    console.log(data);
    
    if(data.trim() != "" && data.trim() != " " && data.length > 1){
      let lista=this.busquedaRutas.filter((v)=>{
        return v.nombre.toLowerCase().includes(data);
      })
      this.cargarLista(lista)
    }else if(data == "/"){
      this.cargarLista(this.busquedaRutas)
    } 
    else{
      this.cargarLista([])
    }
  }

  cargarLista(lista:any[]){
    this.listaIter=lista
  }

}
