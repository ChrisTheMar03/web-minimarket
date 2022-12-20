import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias:Categoria[]
  nombre:string
  categoria:Categoria
  formcat:FormGroup

  @ViewChild("add") add:ElementRef

  constructor(private renderer:Renderer2,private catService:CategoriaService) {
    this.categorias=[]
    this.formcat=new FormGroup({
      nombre:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
    this.cargarCategoria()
  }

  abrirAddCat(){
    this.renderer.addClass(this.add.nativeElement,'mostrar')
  }

  async cargarCategoria(){
    this.categorias = await this.catService.listar()
  }

  guardar(){
    if(this.formcat.valid){
      const cat =new Categoria(null,this.formcat.value.nombre);
      this.catService.agregar(cat)
      this.renderer.removeClass(this.add.nativeElement,'mostrar')
      this.cargarCategoria()
    }
  }

}
