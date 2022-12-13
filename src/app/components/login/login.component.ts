import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, ValidatorFn} from '@angular/forms'
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulariologueo:FormGroup
  isLoading:boolean
  msg:string

  constructor(private router:Router,private usuarioService:UsuarioService) {
    this.isLoading=false
    this.msg=""
    this.formulariologueo=new FormGroup({
      usuario:new FormControl('',[Validators.required,
        Validators.minLength(6)]),
      clave:new FormControl('',[Validators.required,
        Validators.minLength(7)])
    })
   }

  ngOnInit(): void {
    this.verificarSesion()
  }

  async onSubmit(){
    this.isLoading=true
    if(this.formulariologueo.valid){
      //Captura usuario - codigo
      // console.log(this.formulariologueo.value.usuario);
      // console.log(this.formulariologueo.value.clave);
      
      this.validarInicioSesion(this.formulariologueo.value.usuario,this.formulariologueo.value.clave)
        .then(res=>{
          if(res!=null){
            this.isLoading=false
            this.msg=""
            console.log(res);
            this.usuarioSesionActive(res)
            this.router.navigate(['/principal'])
          }else{
            this.isLoading=false
            this.msg="Usuario no existe, ingrese nuevamente"
          }
        })

    }else{
      this.isLoading=false
      this.msg="Complete credenciales"
    }
  }

  async validarInicioSesion(username:string,password:string){
    return await this.usuarioService.iniciarSesion(username,password)
  }

  usuarioSesionActive(usuario:Usuario){
    localStorage.setItem("usuario",JSON.stringify(usuario));
  }

  verificarSesion(){
    if(localStorage.getItem("usuario")!=null){
      this.router.navigate(['/principal'])
    }
  }

  espaciosValidator(name:string):ValidatorFn | Object{
    let space=""
      for (const ca of name) {
        if(ca == " "){
          return {isValid:false}
        }else{
          space += ca
        }
      }
      return null
    }
}

