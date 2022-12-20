import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { Marca } from '../../models/marca';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  formRegistro:FormGroup
  marcas:Marca[]
  categorias:Categoria[]
  producto:Producto
  marca:Marca
  categoria:Categoria
  productos:Producto[]

  constructor(private productoService:ProductoService,private catService:CategoriaService,private marcaService:MarcaService) {
    this.categoria=new Categoria()
    this.marca=new Marca()
    this.formRegistro=new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      precio:new FormControl('',[Validators.required]),
      stock:new FormControl('',[Validators.required]),
      imagen:new FormControl('',[Validators.required]),
      estado:new FormControl('',[Validators.required]),
      idCat:new FormControl('',[Validators.required]),
      idMarca:new FormControl('',[Validators.required]),
    })
   }

  ngOnInit(): void {
    this.cargarMarcas()
    this.cargarCategorias()
    this.cargarProductos()
  }


  async cargarMarcas(){
    this.marcas = await this.marcaService.listar();
  }

  async cargarCategorias(){
    this.categorias = await this.catService.listar()
  }

  capturarCategoria(e){
    this.categoria = new Categoria(e.target.value,"")
    console.log(this.categoria);
    
  }


  capturarMarca(ev){
    this.marca =new Marca(ev.target.value,"")
    console.log(this.marca);
    
  }

  
  registroEvent(){
    const pro = this.formRegistro.value
    let prod = new Producto(null,pro.estado,pro.nombre,pro.precio,pro.stock,this.categoria,this.marca,pro.imagen);
    console.log(prod);
    this.productoService.agregar(prod)
      .then((res)=>{
        if(res!=0){
          alert("Producto agregado Exitosamente")
          this.cargarProductos()
        }else{
          console.log("No se pudo agregar"); 
        }
    })
    
  }

  async cargarProductos(){
    this.productos = await this.productoService.listar()
  }

}

