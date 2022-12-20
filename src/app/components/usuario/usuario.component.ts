import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Roles } from '../../models/roles';
import { RolesService } from '../../services/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios:Usuario[]
  roles:Roles[]
  formusuario:FormGroup
  rol:Roles
  formupdate:FormGroup

  constructor(private usuarioService:UsuarioService,private rolesService:RolesService) {
    this.usuarios=[]
    this.roles=[]
    this.formusuario=new FormGroup({
      nombre:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required,Validators.minLength(5)]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.minLength(7)]),
      idRol:new FormControl('',[Validators.required]),
    })
    this.formupdate=new FormGroup({
      id:new FormControl('',[Validators.required]),
      nombre:new FormControl('',[Validators.required]),
      username:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
      idRol:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
    this.cargarUsuario()
    this.cargarRoles()
  }

  async cargarUsuario(){
   this.usuarios = await this.usuarioService.listar()
  }

 async cargarRoles() {
  this.roles = await this.rolesService.listar() 
 }

 enviarDatos(){
  if(this.formusuario.valid){
    const usu = this.formusuario.value
    const user = new Usuario(null,usu.email,usu.nombre,usu.password,usu.username,this.rol)
    this.agregarUsuario(user)
  }
 }

  async agregarUsuario(usuario:Usuario){
  let res = await this.usuarioService.agregar(usuario)
  if(res!=0){
    alert("Usuario agregado")
  }else{
    console.log("No se pudo crear el usuario");
  }
  this.cargarUsuario()
 }

 cambioRol(e){
  this.rol=new Roles(e.target.value,"")
 }

//   async verificarNombre(nameControl:FormControl){
//     const valor = nameControl.value.toLowerCase()
//     console.log(this.usuarios);
    
//     return {error:"Usuario en uso"}
//  }

  obtenerDatos(usu){
    // console.log(usu);
    this.formupdate=new FormGroup({
      id:new FormControl(usu.id,[Validators.required]),
      nombre:new FormControl(usu.nombre,[Validators.required]),
      username:new FormControl(usu.username,[Validators.required]),
      email:new FormControl(usu.email,[Validators.required]),
      password:new FormControl(usu.password,[Validators.required]),
      idRol:new FormControl(usu.idRol.id,[Validators.required])
    })
  }

  //Update
  updateDatos(){
    console.log(this.formupdate.value);
    
  }


}
