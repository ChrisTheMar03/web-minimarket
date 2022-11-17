import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  opcionOculta:boolean=true

  @ViewChild("useroption") useroption:ElementRef

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
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

}
