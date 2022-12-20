import { Usuario } from './usuario';
export class Venta {

    ventaId:number
    fecha:Date
    total:number
    usuId:Usuario

    constructor(ventaId:number=null,
        fecha:Date=null,
        total:number=0,
        usuId:Usuario=null){
        this.ventaId=ventaId
        this.fecha=fecha
        this.total=total
        this.usuId=usuId
    }

}
