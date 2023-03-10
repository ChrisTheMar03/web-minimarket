import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { DetalleVentas } from '../../models/detalle-ventas';
import { DetalleventaService } from '../../services/detalleventa.service';

//dpf
import { Cell, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Router } from '@angular/router';
import { Utils } from '../../utils/utilitarios';
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {


  montoTotal:number
  pagoCliente:number
  cambio:number
  dtventa:DetalleVentas[]
  RUC:number
  nombreUsuario:string
  cantidadTotal:number
  utils:Utils

  constructor(private renderer:Renderer2,private dtService:DetalleventaService,
    private router:Router) {
    this.montoTotal=0
    this.pagoCliente=0
    this.cambio=0
    this.dtventa=[]
    this.RUC=20568451245
    this.nombreUsuario=""
    this.cantidadTotal=0
    this.utils=new Utils()
   }

  tipo:string
  ngOnInit(): void {
    this.tipo="efectivo"
    this.cargarDetallesxVenta(parseInt(localStorage.getItem("numventa")))
    this.nombreUsuario=JSON.parse(localStorage.getItem("usuario")).nombre
  }

  obtenerCambio(monto){
    if(monto.value && monto.value >= this.montoTotal){
      this.cambio =this.pagoCliente - this.montoTotal
    }
    
  }
  
  async cargarDetallesxVenta(id:number){
    this.dtventa = await this.dtService.listarXventa(id)
    this.montoTotal = parseFloat(this.utils.formatearPrecio(this.total()))
    this.cantidadTotal=this.cantidadTotalGen()
  }

  total():number{
    let suma = 0
    this.dtventa.forEach((v)=>{
      suma+=v.idPro.precio * v.cantidad
    })
    return suma
  }

  generarBoleta(){
    //* PDF MAKER
    // const definicion:any={
    //   // pageSize:'A3',
    //   content:[
    //     {
    //       text:'Boleta de Venta',fontSize:30,alignment:'center',bold:true,marginBottom:24
    //     },
    //     {
    //       text:`RUC: ${this.RUC}`,fontSize:18,marginBottom:16,alignament:'right'
    //     },
        
    //     {
    //       columns:[
    //         {
    //           text:'Minimarket Gonzales',fontSize:14,alignament:'left',width:'auto'
    //         }
    //         // {
    //         //   text:this.cargarFechaActual(),width:'*',fontSize:14
    //         // }
    //       ]
    //     },
    //     {
    //       text:'--',marginTop:10,marginBottom:10
    //     },
    //     {
    //       text:`Sr(a)`,bold:true,fontSize:12,marginBottom:3
    //     },
    //     {
    //       text:`${this.nombreUsuario}`,fontSize:12,marginBottom:8
    //     },
    //     {
    //       text:`Fecha de Emision:`,bold:true,fontSize:12,marginBottom:3
    //     },
    //     {
    //       text:this.cargarFechaActual(),fontSize:12,marginBottom:8
    //     },
    //     {
    //       text:'Tipo de moneda',bold:true,fontSize:12,marginBottom:3
    //     },
    //     {
    //       text:"SOLES",fontSize:12,marginBottom:8
    //     },
    //     {
    //       table:{
    //         body:[
    //           ["Nombre Producto",
    //           "Cantidad",
    //           "Descuento",
    //           "Precio"],
    //           this.dtventa.forEach((v)=>{
    //             [
    //               "dos"
    //             ]
    //           })
    //         ]
    //       }
    //     }
    //   ]
    // }

    // const pdf = pdfMake.createPdf(definicion)
    // pdf.open()

    //*PDF WRAPPER
    const pdf = new PdfMakeWrapper();

    // Adding format to text
    pdf.add(new Txt('Boleta de Venta').alignment('center').fontSize(30).end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Txt(`RUC: ${this.RUC}`).fontSize(18).end)
    pdf.add(new Txt('Minimarket Gonzales').fontSize(14).end)
    pdf.add(' ')
    pdf.add('--')
    pdf.add(' ')
    //Sr(a)`,bold:true,fontSize:12, || ${this.nombreUsuario}`,fontSize:12,marginBottom:8
    pdf.add(new Txt('Sr(a)').bold().fontSize(12).end)
    pdf.add(new Txt(this.nombreUsuario).fontSize(12).end)
    pdf.add(' ')
    pdf.add(new Txt(`Fecha de Emision:`).bold().fontSize(12).end)
    pdf.add(new Txt(this.cargarFechaActual()).fontSize(12).end)
    pdf.add(' ')
    pdf.add(new Txt(`Tipo de moneda`).bold().fontSize(12).end)
    pdf.add(new Txt('SOLES').fontSize(12).end)
    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Table([
      ["Nombre Producto","Cantidad","Descuento","Precio"],
    ]).widths(['*','*','*','*']).margin([0,0,5,0]).end)
    
    this.dtventa.forEach((v)=>{
        pdf.add(new Txt(v.idPro.nombre).fontSize(10).width(50).relativePosition(0,5).end)
        pdf.add(new Txt(v.cantidad.toString()).fontSize(10).width(50).relativePosition(190,5).end)
        pdf.add(new Txt('0.0').width(50).fontSize(10).relativePosition(300,5).end)
        pdf.add(new Txt(' ').width(50).end)
        pdf.add(new Txt(`S/.${this.utils.formatearPrecio(v.idPro.precio).toString()}`).width(50).fontSize(10).relativePosition(430,-10).end)
    })

    pdf.add(' ')
    pdf.add(' ')
    pdf.add(new Txt('Total Venta').bold().alignment("right").fontSize(10).end)
    pdf.add(new Txt("S/. "+this.utils.formatearPrecio(this.montoTotal).toString()).fontSize(10).alignment("right").end)
    pdf.add(' ')
    pdf.add(new Txt('Descuento').bold().alignment("right").fontSize(10).end)
    pdf.add(new Txt("S/. 0.00").fontSize(10).alignment("right").end)
    pdf.add(' ')
    pdf.add(new Txt('Cantidad Productos').bold().alignment("right").fontSize(10).end)
    pdf.add(new Txt(this.cantidadTotal.toString()).fontSize(10).alignment("right").end)
    pdf.add(' ')
    pdf.add(new Txt('Importe Total').bold().alignment("right").fontSize(10).end)
    pdf.add(new Txt(`S/. ${this.utils.formatearPrecio(this.montoTotal)}`).fontSize(30).alignment("right").italics().end)
    pdf.add(' ')
    

    pdf.create().open()
  }

  cargarFechaActual():string{
    return new Date().toLocaleString()
  }

  cantidadTotalGen():number{
    let can=0
    this.dtventa.forEach((v)=>{
      can+=v.cantidad
    })
    return can;
  }

  finalizarCompra(){
    const numVenta=parseInt(localStorage.getItem("numventa"))+1
    localStorage.setItem("numventa",numVenta.toString());
    localStorage.setItem("nuevaventa","1")
    this.redireccionar()
  }

  redireccionar(){
    this.router.navigate(['/principal']);
  }

}
