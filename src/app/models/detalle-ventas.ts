import { Producto } from './producto';
import { Ventas } from './venta';
export class DetalleVentas {
    idDetalleVenta:number
    cantidad:number
    idPro:Producto
    ventaId:Ventas

    constructor(idDetalleVenta:number=null,
        cantidad:number,
        idPro=null,
        ventaId:Ventas=null){
            this.idDetalleVenta=idDetalleVenta
            this.cantidad=cantidad
            this.idPro=idPro
            this.ventaId=ventaId
        }

}
