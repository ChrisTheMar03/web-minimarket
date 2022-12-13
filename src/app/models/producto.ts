import { Categoria } from "./categoria"
import { Marca } from "./marca"

export class Producto {
    idPro:number
    estado:number
    nombre:string
    precio:number
    stock:number
    idCat:Categoria
    idMarca:Marca
    imagen:string

    constructor(idPro:number=null,
        estado:number=1,
        nombre:string="",
        precio:number=0,
        stock:number=0,
        idCat:Categoria=null,
        idMarca:Marca=null,
        imagen:string=""){
        this.idPro=idPro
        this.estado=estado
        this.nombre=nombre
        this.precio=precio
        this.stock=stock
        this.idCat=idCat
        this.idMarca=idMarca
        this.imagen=imagen
    }

}
