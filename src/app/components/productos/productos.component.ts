import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { Marca } from '../../models/marca';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { Producto } from '../../models/producto';
import { Utils } from '../../utils/utilitarios';

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
  updateProduct:FormGroup
  marcaUpdate:Marca
  categoriaUpdate:Categoria
  utils:Utils

  constructor(private productoService:ProductoService,private catService:CategoriaService,private marcaService:MarcaService) {
    this.categoria=new Categoria()
    this.marca=new Marca()
    this.marcaUpdate=new Marca()
    this.categoriaUpdate=new Categoria()
    this.formRegistro=new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      precio:new FormControl('',[Validators.required]),
      stock:new FormControl('',[Validators.required]),
      imagen:new FormControl('',[Validators.required]),
      estado:new FormControl('',[Validators.required]),
      idCat:new FormControl('',[Validators.required]),
      idMarca:new FormControl('',[Validators.required])
    })
    this.updateProduct=new FormGroup({
      idPro:new FormControl('',[Validators.required]),
      nombre:new FormControl('',[Validators.required]),
      precio:new FormControl('',[Validators.required]),
      stock:new FormControl('',[Validators.required]),
      imagen:new FormControl('',[Validators.required]),
      estado:new FormControl('',[Validators.required]),
      idCat:new FormControl('',[Validators.required]),
      idMarca:new FormControl('',[Validators.required])
    })
    this.utils=new Utils()
   }

  ngOnInit(): void {
    this.cargarMarcas()
    this.cargarCategorias()
    this.cargarProductos()
  }

  async cargarProductos(){
    this.productos = await this.productoService.listar()
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


  obtenerProductoUpdate(pr){
    console.log(pr);
    
    this.updateProduct=new FormGroup({
      idPro:new FormControl(pr.idPro,[Validators.required]),
      nombre:new FormControl(pr.nombre,[Validators.required]),
      precio:new FormControl(pr.precio,[Validators.required]),
      stock:new FormControl(pr.stock,[Validators.required]),
      imagen:new FormControl(pr.imagen,[Validators.required]),
      estado:new FormControl(pr.estado,[Validators.required]),
      idCat:new FormControl(pr.idCat.idCat,[Validators.required]),
      idMarca:new FormControl(pr.idMarca.idMarca,[Validators.required])
    })
    
  }

  actualizarProducto(){
    const pro=this.updateProduct.value
    const producto=new Producto(pro.idPro,pro.estado,pro.nombre,pro.precio,pro.stock,new Categoria(pro.idCat,"")
      ,new Marca(pro.idMarca,""),pro.imagen);
    console.log(producto);
    
    if(this.updateProduct.valid){
      try {
        this.productoService.update(producto).then((res)=>{
          if(res!=0){
            alert("Producto actualizado")
          }else{
            console.log("No se puedo actualizar");
          }
        }) 
      } catch (error) {
        console.log("Error de servidor");
      }

    }
      
    
  }

  capturarMarcaUpdate(e){
    console.log(e.target.value);
    this.marcaUpdate=new Marca(e.target.value,"")
  }

  capturarCategoriaUpdate(e){
    console.log(e.target.value);
    this.categoriaUpdate=new Categoria(e.target.value,"")
  }

  filtrarProducto(e){
    const valor = e.target.value
    const lista = Array.from(document.querySelectorAll('#nombres'))
    if(valor.length > 2){
      // let dato = lista.find(v=>{
      //   return v.innerHTML.toLowerCase().includes(valor.toLowerCase())
      // });
      // if(dato!=undefined){
      //   dato.classList.remove('filtro')
      //   dato.classList.add('filtro')
      // }

      lista.forEach((v)=>{
        if(v.innerHTML.toLowerCase().includes(valor.toLowerCase())){
          v.classList.add('filtro')
          let geo = v.getBoundingClientRect();
          // console.log(geo.y);
          // window.scrollTo(geo)
          
        }else{
          v.classList.remove('filtro')
        }
        
      })
      
    }
  }

}

