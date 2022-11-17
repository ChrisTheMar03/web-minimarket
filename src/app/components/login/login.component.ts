import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulariologueo:FormGroup

  constructor(private router:Router) {
    this.formulariologueo=new FormGroup({
      usuario:new FormControl('',[Validators.required]),
      clave:new FormControl('',[Validators.required])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.formulariologueo.valid){
      if(this.validarInicioSesion()){
        this.router.navigate(['/principal'])
        console.log(this.formulariologueo.value);
      }
    }else{
      console.log("No agrego credenciales");
    }
  }

  validarInicioSesion():boolean{
    return true
  }

}
