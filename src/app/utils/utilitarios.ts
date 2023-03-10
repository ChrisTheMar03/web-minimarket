
export class Utils{

    formatearPrecio(precio:number){
        //* 1.5 - 0.2 - 15.35
        // let numeroGenerico=""
        // const word=precio.toString()
        // const cortado1 = word.substring(0,word.indexOf('.')+1)
        // const cortado = word.substring((word.indexOf('.')+1),word.length);

        // console.log(cortado);
        // let denominador=""
        // if(cortado.length == 1){
        //     denominador=cortado+"0"
        // }else if(cortado.length > 1){
        //     // denominador=((parseInt(cortado.substring(0,2))/10)+(parseInt(cortado.substring(0,2))%10)).toString()
        //     const pc = cortado.substring(1,2)
        //     const nm = Math.round(parseFloat("0."+pc))
        //     const dec = parseFloat(cortado.substring(0,1))+nm
        //     denominador=dec+"0"
        // }

        // numeroGenerico=cortado1+denominador
        
        return (parseFloat(precio.toString()).toFixed(2));

    }

    fechaActualFormateada(){
        
    }

}