import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import{FormGroup,FormBuilder,Validators} from '@angular/forms';
import{Router} from '@angular/router';
import{UserServiceService} from '../../Services/UserService/user-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  loginform:FormGroup
  submitted=false

  constructor(
              private formBuilder:FormBuilder,
              private router:Router,
              private userService:UserServiceService
              ,private snackBar:MatSnackBar) { }

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
                    localStorage.setItem('token', response['token']);

                    this.router.navigate(['/dashboard'])
                   
                    this.snackBar.open(response['message'],'',{
                      duration:2000,
                      verticalPosition: 'top',
                      horizontalPosition:'center'
                    });

                    

                  },
                  
                   
                  error=>
                  {
                  console.log('error msg', error);
                  this.snackBar.open(error['error']['message'] ,'Error Occured',{ 
                    duration:50000,
                    verticalPosition: 'top',
                    horizontalPosition:'center' } )
                            }) 
              }
              forgetPassword(data)
              {
                this.router.navigate(['/forgetpassword'])

              }
                // convenience getter for easy access to form fields
    get f() { return this.loginform.controls; }
}