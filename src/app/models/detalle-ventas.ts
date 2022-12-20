import { Producto } from './producto';
export class DetalleVentas {
    idDetalleVenta:number
    cantidad:number
    idPro:Producto

    constructor(idDetalleVenta:number=null,
        cantidad:number,
        idPro=null){
            this.idDetalleVenta=idDetalleVenta
            this.cantidad=cantidad
            this.idPro=idPro
        }

}
