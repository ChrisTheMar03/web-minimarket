import { Usuario } from './usuario';
export class Ventas {

    ventaId:number
    fecha:Date
    id:Usuario

    constructor(ventaId:number=null,
        fecha:Date=null,
        id:Usuario=null){
        this.ventaId=ventaId
        this.fecha=fecha
        this.id=id
    }

}
