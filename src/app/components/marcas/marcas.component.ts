import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MarcaService } from '../../services/marca.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Marca } from '../../models/marca';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  @ViewChild("add") add:ElementRef
  formmar:FormGroup
  marcas:Marca[]

  constructor(private renderer:Renderer2,private marcaService:MarcaService) {
    this.formmar=new FormGroup({
      nombre:new FormControl('')
    })
  }

  ngOnInit(): void {
    this.listarMarcas()
  }

  abrirAddCat(){
    this.renderer.addClass(this.add.nativeElement,'mostrar')
  }

  guardar(){
    if(this.formmar.valid){
      const mar = new Marca(null,this.formmar.value.nombre)
      this.marcaService.agregar(mar)
      this.renderer.removeClass(this.add.nativeElement,'mostrar')
      this.listarMarcas()
    }
  }

  async listarMarcas(){
    this.marcas = await this.marcaService.listar()
  }

}
