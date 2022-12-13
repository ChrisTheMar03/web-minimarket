import { Roles } from "./roles"

export class Usuario {
    id:number
    email:string
    nombre:string
    password:string
    username:string
    idRol:Roles

    constructor(id:number=null,
        email:string="",
        nombre:string="",
        password:string="",
        username:string="",
        idRol:Roles=null){
            this.id=id
            this.email=email
            this.nombre=nombre
            this.password=password
            this.username=username
            this.idRol=idRol
    }

}
