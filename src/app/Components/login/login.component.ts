import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform:FormGroup
 

  constructor(
              private formBuilder:FormBuilder,
              private router:Router,
              private userService:UserServiceService) { }

              hide=true
              ngOnInit() {
                          this.loginform=this.formBuilder.group ({
               
                  email:['',[Validators.required,Validators.email]],
                  password: ['', [Validators.required, Validators.minLength(6)]],
               
                },
                 );
              }

              
              login(data)
              {
                  let user= {
                    email:this.loginform.value.email,
                    password:this.loginform.value.password

                  }
                  this.userService.login(user).subscribe(response=>
                    {
                    console.log('response after login',response);
                    this.router.navigate(['/dashboard'])

                  },
                  
                   
                  error=>
                  {
                  console.log('error msg', error);
                  })
              }
              forgetPassword(data)
              {
                this.router.navigate(['/forgetpassword'])

              }
}