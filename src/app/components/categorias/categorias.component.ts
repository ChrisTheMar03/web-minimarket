import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  @ViewChild("add") add:ElementRef

  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }

  abrirAddCat(){
    this.renderer.addClass(this.add.nativeElement,'mostrar')
  }

}
